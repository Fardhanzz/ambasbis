import type { Subject } from '../types';

export const NEO_SUBJECT_COLORS = [
  { hex: '#FFD447', label: 'Kuning Kunyit' },
  { hex: '#72C7ED', label: 'Biru Langit' },
  { hex: '#B59AFF', label: 'Ungu Lilac' },
  { hex: '#A8E063', label: 'Hijau Limau' },
  { hex: '#FFA45B', label: 'Oranye Jingga' },
  { hex: '#FF6B6B', label: 'Merah Koral' },
  { hex: '#4D96FF', label: 'Biru Elektrik' },
  { hex: '#2EC4B6', label: 'Toska Segar' },
  { hex: '#FF70A6', label: 'Pink Cerah' },
  { hex: '#FFD166', label: 'Kuning Emas' },
  { hex: '#06D6A0', label: 'Hijau Mint' },
  { hex: '#9B5DE5', label: 'Ungu Neon' }
];

export const SUBJECT_EMOJI_PRESETS = [
  '📐', '🧪', '⚡', '🌱', '💻', '📚', '🇬🇧', '🏛️',
  '🌍', '📊', '👥', '🎨', '⚽', '🕌', '🇮🇩', '💡',
  '🎵', '✍️', '🤖', '💼', '🔬', '🏥', '⚖️', '🎬'
];

export const CURATED_SUBJECT_PRESETS: Subject[] = [
  { id: 'subj_matematika', name: 'Matematika', color: '#FFD447', icon: '📐' },
  { id: 'subj_kimia', name: 'Kimia', color: '#72C7ED', icon: '🧪' },
  { id: 'subj_fisika', name: 'Fisika', color: '#B59AFF', icon: '⚡' },
  { id: 'subj_biologi', name: 'Biologi', color: '#A8E063', icon: '🌱' },
  { id: 'subj_informatika', name: 'Informatika', color: '#72C7ED', icon: '💻' },
  { id: 'subj_indo', name: 'B. Indonesia', color: '#FFA45B', icon: '📚' },
  { id: 'subj_inggris', name: 'B. Inggris', color: '#4D96FF', icon: '🇬🇧' },
  { id: 'subj_sejarah', name: 'Sejarah', color: '#F4A261', icon: '🏛️' },
  { id: 'subj_geografi', name: 'Geografi', color: '#2EC4B6', icon: '🌍' },
  { id: 'subj_ekonomi', name: 'Ekonomi', color: '#FFD166', icon: '📊' },
  { id: 'subj_sosiologi', name: 'Sosiologi', color: '#FFA45B', icon: '👥' },
  { id: 'subj_seni', name: 'Seni Budaya', color: '#FF70A6', icon: '🎨' },
  { id: 'subj_pjok', name: 'PJOK / Penjas', color: '#06D6A0', icon: '⚽' },
  { id: 'subj_agama', name: 'Pend. Agama', color: '#72C7ED', icon: '🕌' },
  { id: 'subj_ppkn', name: 'PPKn / PKn', color: '#FF6B6B', icon: '🇮🇩' },
  { id: 'subj_pkwu', name: 'Kewirausahaan (PKWU)', color: '#FFD447', icon: '💡' },
  { id: 'subj_musik', name: 'Seni Musik', color: '#9B5DE5', icon: '🎵' },
  { id: 'subj_robotika', name: 'Robotika & IoT', color: '#4D96FF', icon: '🤖' }
];

export const JURUSAN_PRESETS = {
  IPA: ['subj_matematika', 'subj_fisika', 'subj_kimia', 'subj_biologi', 'subj_indo', 'subj_inggris'],
  IPS: ['subj_ekonomi', 'subj_geografi', 'subj_sosiologi', 'subj_sejarah', 'subj_matematika', 'subj_indo', 'subj_inggris'],
  TEKNIK_IT: ['subj_matematika', 'subj_fisika', 'subj_informatika', 'subj_robotika', 'subj_inggris', 'subj_indo']
};
