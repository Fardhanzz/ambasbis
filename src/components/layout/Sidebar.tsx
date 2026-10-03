import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Plus, Settings2, Trash2 } from 'lucide-react';
import type { Subject, UserProfile } from '../../types';

export interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeTaskCount: number;
  onOpenAddTask: () => void;
  selectedSubjectId: string | null;
  onSelectSubject: (id: string | null) => void;
  subjects: Subject[];
  user: UserProfile;
  onOpenAddSubject: () => void;
  onOpenSubjectSetup: () => void;
  onDeleteSubject?: (id: string) => void;
  onOpenAuth?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  activeTaskCount,
  onOpenAddTask,
  selectedSubjectId,
  onSelectSubject,
  subjects,
  user,
  onOpenAddSubject,
  onOpenSubjectSetup,
  onDeleteSubject,
  onOpenAuth
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} strokeWidth={2.5} /> },
    { id: 'tasks', label: 'Semua Tugas', icon: <CheckSquare size={20} strokeWidth={2.5} />, badge: activeTaskCount },
    { id: 'calendar', label: 'Kalender', icon: <Calendar size={20} strokeWidth={2.5} /> }
  ];

  return (
    <aside className="sidebar-desktop">
      {/* Brand & Logo */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: 'var(--color-red)',
                border: 'var(--border-thick)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 0 var(--color-black)',
                color: 'var(--color-white)',
                fontWeight: 900,
                fontSize: '1.2rem',
                fontFamily: 'var(--font-heading)'
              }}
            >
              A
            </div>
            <div>
              <h1 style={{ fontSize: '1.45rem', lineHeight: 1, letterSpacing: '-0.03em' }}>
                AMBASBIS
              </h1>
            </div>
          </div>
          <span
            style={{
              backgroundColor: 'var(--color-yellow)',
              border: '2px solid var(--color-black)',
              borderRadius: '9999px',
              padding: '2px 6px',
              fontSize: '0.65rem',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              boxShadow: '2px 2px 0 var(--color-black)'
            }}
          >
            V2 MVP
          </span>
        </div>

        <p
          style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
            lineHeight: 1.3
          }}
        >
          Atur tugasmu. Taklukkan deadline.
        </p>

        {/* Primary CTA button */}
        <button
          onClick={onOpenAddTask}
          className="neo-btn neo-btn-primary"
          style={{ width: '100%', marginBottom: '24px', justifyContent: 'center' }}
        >
          <Plus size={18} strokeWidth={3} />
          <span>+ TUGAS BARU</span>
        </button>

        {/* Navigation list */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? 'var(--border-thick)' : '2.5px solid transparent',
                  backgroundColor: isActive ? 'var(--color-yellow)' : 'transparent',
                  boxShadow: isActive ? '4px 4px 0 var(--color-black)' : 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: 'var(--color-black)',
                  transform: isActive ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    style={{
                      background: isActive ? 'var(--color-black)' : '#EBE4DC',
                      color: isActive ? 'var(--color-white)' : 'var(--color-black)',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      border: '1.5px solid var(--color-black)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Subjects list shortcut & Add Subject Feature (repair.txt Item 4) */}
        <div style={{ marginTop: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              paddingLeft: '4px'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                fontWeight: 900,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.05em'
              }}
            >
              MATA PELAJARAN ({subjects.length})
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={onOpenAddSubject}
                title="Tambah Mata Pelajaran Baru"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  backgroundColor: 'var(--color-yellow)',
                  border: '1.5px solid var(--color-black)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '1px 1px 0 var(--color-black)'
                }}
              >
                <Plus size={11} strokeWidth={3} />
                <span>TAMBAH</span>
              </button>
              <button
                type="button"
                onClick={onOpenSubjectSetup}
                title="Pilih & Atur Ulang Mata Pelajaran"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--color-black)',
                  borderRadius: '4px',
                  padding: '2px 5px',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '1px 1px 0 var(--color-black)'
                }}
              >
                <Settings2 size={11} strokeWidth={2.5} />
              </button>
              {selectedSubjectId && (
                <button
                  onClick={() => onSelectSubject(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: 'var(--color-red)',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              maxHeight: '230px',
              overflowY: 'auto',
              paddingRight: '2px'
            }}
          >
            {subjects.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              return (
                <div
                  key={sub.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <button
                    onClick={() => onSelectSubject(isSelected ? null : sub.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid var(--color-black)' : '2px solid transparent',
                      background: isSelected ? sub.color : 'transparent',
                      boxShadow: isSelected ? '2px 2px 0 var(--color-black)' : 'none',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minWidth: 0
                    }}
                  >
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{sub.icon || '📚'}</span>
                    <span
                      style={{
                        flex: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {sub.name}
                    </span>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: sub.color,
                        border: '1.5px solid var(--color-black)',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {onDeleteSubject && subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Hapus mata pelajaran "${sub.name}" dari daftar aktif?`)) {
                          onDeleteSubject(sub.id);
                        }
                      }}
                      title={`Hapus mapel ${sub.name}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#999',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-red)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
                    >
                      <Trash2 size={13} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User profile footer */}
      <div
        style={{
          borderTop: 'var(--border-thick)',
          paddingTop: '16px',
          marginTop: '16px'
        }}
      >
        <div
          onClick={onOpenAuth}
          role="button"
          tabIndex={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#FDF6EE',
            border: '2px solid var(--color-black)',
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            boxShadow: '3px 3px 0 var(--color-black)',
            cursor: 'pointer',
            transition: 'transform 0.1s ease'
          }}
          title="Klik untuk membuka autentikasi / profil akun"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '2px solid var(--color-black)',
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
          ) : (
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-purple)',
                border: '2px solid var(--color-black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.1rem',
                color: 'var(--color-black)',
                flexShrink: 0
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'P'}
            </div>
          )}
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user.name}
            </p>
            <p
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user.email || `${user.timezone} (WIB)`}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
