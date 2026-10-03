import type { Subject, Task, Reminder, UserProfile } from '../types';

export const mockUser: UserProfile = {
  id: 'usr_fardhan_01',
  name: 'Fardhan',
  email: 'fardhan.student@ambasbis.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  timezone: 'Asia/Jakarta',
  createdAt: '2026-09-01T08:00:00Z'
};

export const mockSubjects: Subject[] = [
  { id: 'subj_kimia', name: 'Kimia', color: '#72C7ED', icon: '🧪' },
  { id: 'subj_matematika', name: 'Matematika', color: '#FFD447', icon: '📐' },
  { id: 'subj_fisika', name: 'Fisika', color: '#B59AFF', icon: '⚡' },
  { id: 'subj_biologi', name: 'Biologi', color: '#A8E063', icon: '🌱' },
  { id: 'subj_informatika', name: 'Informatika', color: '#72C7ED', icon: '💻' },
  { id: 'subj_indo', name: 'B. Indonesia', color: '#FFA45B', icon: '📚' }
];

// Helper to create dates relative to now
const now = new Date();
const toIsoHours = (hoursFromNow: number) => {
  const d = new Date(now.getTime() + hoursFromNow * 60 * 60 * 1000);
  return d.toISOString();
};

// Helper for exact day offsets (midnight + specified hour)
const toDayOffsetIso = (dayOffset: number, hour = 23, minute = 59) => {
  const d = new Date(now);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const initialMockTasks: Task[] = [
  {
    id: 'task_01',
    userId: 'usr_fardhan_01',
    subjectId: 'subj_kimia',
    title: 'Laporan Praktikum Titrasi Asam Basa',
    description: 'Menyusun laporan lengkap praktikum kimia asam-basa beserta kurva titrasi dan perhitungan konsentrasi molaritas sampel.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    deadline: toDayOffsetIso(1, 23, 59), // H-1 (Besok)
    estimatedMinutes: 120,
    subtasks: [
      { id: 'st_01', taskId: 'task_01', title: 'Cari teori dasar & landasan pustaka', completed: true, order: 1 },
      { id: 'st_02', taskId: 'task_01', title: 'Buat tabel hasil pengamatan larutan', completed: true, order: 2 },
      { id: 'st_03', taskId: 'task_01', title: 'Plot grafik kurva titrasi & absorbansi', completed: true, order: 3 },
      { id: 'st_04', taskId: 'task_01', title: 'Analisis & pembahasan kesalahan titrasi', completed: false, order: 4 },
      { id: 'st_05', taskId: 'task_01', title: 'Tulis kesimpulan & daftar pustaka APA', completed: false, order: 5 }
    ],
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-02T08:30:00Z'
  },
  {
    id: 'task_02',
    userId: 'usr_fardhan_01',
    subjectId: 'subj_matematika',
    title: 'Latihan Soal Matriks & Invers Halaman 45–47',
    description: 'Kerjakan 10 soal essay di buku paket matematika, tulis rapi di kertas folio bergaris beserta langkah eliminasi Gauss.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    deadline: toDayOffsetIso(0, 20, 0), // Hari H (Hari ini jam 20:00)
    estimatedMinutes: 90,
    subtasks: [
      { id: 'st_06', taskId: 'task_02', title: 'Nomor 1-5 Operasi Perkalian Matriks', completed: true, order: 1 },
      { id: 'st_07', taskId: 'task_02', title: 'Nomor 6-8 Determinan Matriks 3x3', completed: true, order: 2 },
      { id: 'st_08', taskId: 'task_02', title: 'Nomor 9-10 Sistem Persamaan Linear Tiga Variabel', completed: false, order: 3 }
    ],
    createdAt: '2026-10-01T14:00:00Z',
    updatedAt: '2026-10-02T09:00:00Z'
  },
  {
    id: 'task_overdue_01',
    userId: 'usr_fardhan_01',
    subjectId: 'subj_indo',
    title: 'Tugas Analisis Majas & Puisi Kontemporer',
    description: 'Menganalisis majas metafora dan personifikasi dalam antologi puisi Chairil Anwar dan Sutardji Calzoum Bachri.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    deadline: toIsoHours(-8), // TERLAMBAT / SUDAH MELEBIHI DEADLINE
    estimatedMinutes: 60,
    subtasks: [
      { id: 'st_ov_1', taskId: 'task_overdue_01', title: 'Identifikasi bait puisi', completed: true, order: 1 },
      { id: 'st_ov_2', taskId: 'task_overdue_01', title: 'Tulis tabel interpretasi majas', completed: false, order: 2 }
    ],
    createdAt: '2026-09-30T10:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z'
  },
  {
    id: 'task_07',
    userId: 'usr_fardhan_01',
    subjectId: 'subj_informatika',
    title: 'Projek Skema Relasi Database MySQL Toko Online',
    description: 'Entity Relationship Diagram (ERD) dan SQL script DDL untuk normalisasi tabel produk, transaksi, dan customer.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    deadline: toDayOffsetIso(3, 23, 59), // H-3 (3 hari lagi)
    estimatedMinutes: 150,
    subtasks: [
      { id: 'st_19', taskId: 'task_07', title: 'Rancang ERD dengan 3NF', completed: true, order: 1 },
      { id: 'st_20', taskId: 'task_07', title: 'Tulis query CREATE TABLE & Foreign Keys', completed: false, order: 2 },
      { id: 'st_21', taskId: 'task_07', title: 'Uji relasi & insert dummy data', completed: false, order: 3 }
    ],
    createdAt: '2026-10-01T09:00:00Z',
    updatedAt: '2026-10-02T11:00:00Z'
  },
  {
    id: 'task_03',
    userId: 'usr_fardhan_01',
    subjectId: 'subj_informatika',
    title: 'Slide Presentasi Arsitektur Client-Server & API',
    description: 'Membuat 10 slide ringkas untuk presentasi kelompok materi REST API dan protokol HTTP di depan kelas.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    deadline: toDayOffsetIso(2, 14, 0), // H-2 (Tidak memicu notifikasi)
    estimatedMinutes: 60,
    subtasks: [
      { id: 'st_09', taskId: 'task_03', title: 'Kumpulkan poin penting materi TCP/IP vs HTTP', completed: true, order: 1 },
      { id: 'st_10', taskId: 'task_03', title: 'Buat diagram arsitektur di Figma / Canva', completed: false, order: 2 },
      { id: 'st_11', taskId: 'task_03', title: 'Latihan pitching presentasi 5 menit', completed: false, order: 3 }
    ],
    createdAt: '2026-09-30T16:00:00Z',
    updatedAt: '2026-10-02T07:15:00Z'
  },
  {
    id: 'task_04',
    userId: 'usr_fardhan_01',
    subjectId: 'subj_biologi',
    title: 'Makalah Analisis Ekosistem Mangrove & Konservasi',
    description: 'Menganalisis peran hutan bakau terhadap pencegahan abrasi pesisir dan pengaruhnya pada keanekaragaman biota laut.',
    status: 'TODO',
    priority: 'LOW',
    deadline: toDayOffsetIso(5, 23, 59), // H-5 (Tidak memicu notifikasi)
    estimatedMinutes: 180,
    subtasks: [
      { id: 'st_12', taskId: 'task_04', title: 'Studi literatur jurnal ilmiah nasional', completed: false, order: 1 },
      { id: 'st_13', taskId: 'task_04', title: 'Draft bab 1 pendahuluan & latar belakang', completed: false, order: 2 },
      { id: 'st_14', taskId: 'task_04', title: 'Penyusunan bab pembahasan & studi kasus pesisir', completed: false, order: 3 }
    ],
    createdAt: '2026-09-28T11:00:00Z',
    updatedAt: '2026-09-28T11:00:00Z'
  },
  {
    id: 'task_05',
    userId: 'usr_fardhan_01',
    subjectId: 'subj_fisika',
    title: 'Resume Rumus Hukum Termodinamika I & II',
    description: 'Membuat cheasheet 1 lembar rumus siklus Carnot, efisiensi mesin kalor, dan perubahan entropi.',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    deadline: toIsoHours(-24),
    estimatedMinutes: 45,
    subtasks: [
      { id: 'st_15', taskId: 'task_05', title: 'Rangkum konsep usaha dan kalor gas ideal', completed: true, order: 1 },
      { id: 'st_16', taskId: 'task_05', title: 'Buat tabel contoh soal siklus Carnot', completed: true, order: 2 }
    ],
    createdAt: '2026-09-27T09:00:00Z',
    updatedAt: '2026-10-01T20:00:00Z',
    completedAt: '2026-10-01T20:00:00Z'
  }
];

// Notifikasi HANYA muncul saat H-3, H-1, dan Hari H sesuai poin 2 revisi
export const mockReminders: Reminder[] = [
  {
    id: 'rem_hari_h',
    userId: 'usr_fardhan_01',
    taskId: 'task_02',
    taskTitle: 'Latihan Soal Matriks & Invers Halaman 45–47',
    subjectName: 'Matematika',
    deadline: toDayOffsetIso(0, 20, 0),
    remindAt: new Date().toISOString(),
    type: 'DEADLINE_HARI_H',
    channel: 'IN_APP',
    sent: true,
    read: false,
    createdAt: '2026-10-02T08:00:00Z'
  },
  {
    id: 'rem_h_min_1',
    userId: 'usr_fardhan_01',
    taskId: 'task_01',
    taskTitle: 'Laporan Praktikum Titrasi Asam Basa',
    subjectName: 'Kimia',
    deadline: toDayOffsetIso(1, 23, 59),
    remindAt: new Date().toISOString(),
    type: 'DEADLINE_H_MIN_1',
    channel: 'IN_APP',
    sent: true,
    read: false,
    createdAt: '2026-10-02T07:00:00Z'
  },
  {
    id: 'rem_h_min_3',
    userId: 'usr_fardhan_01',
    taskId: 'task_07',
    taskTitle: 'Projek Skema Relasi Database MySQL Toko Online',
    subjectName: 'Informatika',
    deadline: toDayOffsetIso(3, 23, 59),
    remindAt: new Date().toISOString(),
    type: 'DEADLINE_H_MIN_3',
    channel: 'IN_APP',
    sent: true,
    read: false,
    createdAt: '2026-10-02T06:00:00Z'
  }
];
