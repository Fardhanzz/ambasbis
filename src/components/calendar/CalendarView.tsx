import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Task, Subject } from '../../types';
import { calculateUrgency, getUrgencyInfo, formatDeadlineDate } from '../../utils/urgency';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export interface CalendarViewProps {
  tasks: Task[];
  subjects: Subject[];
  onOpenDetail: (task: Task) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  subjects,
  onOpenDetail
}) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const todayDate = React.useMemo(() => new Date(), []);

  const getSubject = (id: string) => subjects.find(s => s.id === id);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
    'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
  ];

  const daysOfWeek = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

  // Days calculation
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // In Indonesia/ISO, week starts on Monday (1). Sunday is 0.
  let startDay = firstDayOfMonth.getDay() - 1;
  if (startDay === -1) startDay = 6; // Sunday is index 6

  const totalDays = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    return todayDate.getDate() === day && todayDate.getMonth() === month && todayDate.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  // Get tasks for a particular day
  const getTasksForDay = (day: number) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.deadline);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year
      );
    });
  };

  // Tasks for the selected date
  const selectedDayTasks = getTasksForDay(selectedDate.getDate());

  return (
    <div>
      {/* Month Navigation Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase' }}>
            {monthNames[month]} {year}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            Visualisasikan tenggat waktu tugas berdasarkan kalender bulanan.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="white" size="sm" icon={<ChevronLeft size={16} strokeWidth={3} />} onClick={prevMonth}>
            BULAN LALU
          </Button>
          <Button
            variant="yellow"
            size="sm"
            onClick={() => {
              const now = new Date();
              setCurrentDate(now);
              setSelectedDate(now);
            }}
          >
            HARI INI
          </Button>
          <Button variant="white" size="sm" icon={<ChevronRight size={16} strokeWidth={3} />} onClick={nextMonth}>
            BULAN DEPAN
          </Button>
        </div>
      </div>

      {/* Main Grid & Side Details Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(280px, 1fr)', gap: '24px' }}>
        {/* Calendar Grid Card */}
        <Card variant="white" style={{ padding: '20px' }}>
          {/* Day of Week Headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              textAlign: 'center',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              fontSize: '0.82rem',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '2px solid var(--color-black)'
            }}
          >
            {daysOfWeek.map((day, idx) => (
              <div key={day} style={{ color: idx >= 5 ? 'var(--color-red)' : 'var(--color-black)' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {/* Empty padding slots before day 1 */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} style={{ minHeight: '65px', opacity: 0.2 }} />
            ))}

            {/* Days 1 to totalDays */}
            {Array.from({ length: totalDays }).map((_, i) => {
              const dayNumber = i + 1;
              const dayTasks = getTasksForDay(dayNumber);
              const today = isToday(dayNumber);
              const selected = isSelected(dayNumber);

              return (
                <div
                  key={`day-${dayNumber}`}
                  onClick={() => setSelectedDate(new Date(year, month, dayNumber))}
                  style={{
                    minHeight: '68px',
                    border: selected ? '2.5px solid var(--color-black)' : '1.5px solid #DDD1C7',
                    borderRadius: '8px',
                    backgroundColor: selected
                      ? 'var(--color-yellow)'
                      : today
                      ? '#FFE5E3'
                      : '#FFFFFF',
                    boxShadow: selected ? '2px 2px 0 var(--color-black)' : 'none',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        color: today ? 'var(--color-red)' : 'var(--color-black)'
                      }}
                    >
                      {dayNumber}
                    </span>
                    {today && (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 900,
                          backgroundColor: 'var(--color-red)',
                          color: '#FFFFFF',
                          padding: '1px 4px',
                          borderRadius: '4px'
                        }}
                      >
                        INI
                      </span>
                    )}
                  </div>

                  {/* Task Dots */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' }}>
                    {dayTasks.map((t) => {
                      const urgency = calculateUrgency(t.deadline, t.status);
                      const urgencyInfo = getUrgencyInfo(urgency);
                      return (
                        <div
                          key={t.id}
                          title={`${t.title} (${urgencyInfo.label})`}
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: urgencyInfo.bg,
                            border: '1px solid var(--color-black)'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Selected Date Inspector Side Card */}
        <Card variant="cream" style={{ padding: '20px' }}>
          <div style={{ borderBottom: '2px solid var(--color-black)', paddingBottom: '12px', marginBottom: '14px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--color-text-muted)'
              }}
            >
              TUGAS TANGGAL
            </span>
            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>
              {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h3>
          </div>

          {selectedDayTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 8px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem' }}>
                Tidak ada deadline tugas pada tanggal ini.
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
                Waktu santai atau dapat digunakan untuk menyicil tugas lainnya!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedDayTasks.map((task) => {
                const subject = getSubject(task.subjectId);
                const urgency = calculateUrgency(task.deadline, task.status);
                const urgencyInfo = getUrgencyInfo(urgency);

                return (
                  <div
                    key={task.id}
                    className="neo-card neo-card-interactive"
                    style={{
                      padding: '12px',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer'
                    }}
                    onClick={() => onOpenDetail(task)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      {subject && (
                        <span
                          style={{
                            backgroundColor: subject.color,
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            border: '1px solid var(--color-black)'
                          }}
                        >
                          {subject.name}
                        </span>
                      )}
                      <span
                        style={{
                          backgroundColor: urgencyInfo.bg,
                          color: urgencyInfo.color,
                          fontSize: '0.65rem',
                          fontWeight: 900,
                          padding: '1px 5px',
                          borderRadius: '4px'
                        }}
                      >
                        {urgencyInfo.badgeText}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '6px' }}>
                      {task.title}
                    </h4>

                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      <span>{formatDeadlineDate(task.deadline)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
