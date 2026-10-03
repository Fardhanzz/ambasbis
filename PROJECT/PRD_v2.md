# PRD --- Student Task & Deadline Manager

**Status:** MVP / V1\
**Target:** Web App, responsive desktop + mobile\
**Primary development approach:** Vibe coding with Google Antigravity\
**Document purpose:** Single source of truth for product, UX, UI, data
model, and implementation requirements.

------------------------------------------------------------------------

# 1. Product Overview

## 1.1 Working Product Name

**TASKORA**

The name is temporary and may be changed later.

## 1.2 Product Vision

TASKORA is a student-focused task management web application designed to
help students capture homework and academic assignments, organize them
by subject, understand what needs attention first, track progress, and
receive deadline reminders.

The core product loop is:

**Capture → Organize → Prioritize → Act → Complete**

The product should not feel like a corporate project-management tool. It
should feel like a friendly, bold, visual command center for schoolwork.

## 1.3 Core Problem

Students often have assignments scattered across notebooks, messaging
apps, classroom platforms, screenshots, and memory. This creates
uncertainty around:

-   What tasks exist
-   Which task should be done first
-   Which deadline is approaching
-   How much of a large assignment has been completed
-   Whether a task has been forgotten

TASKORA solves this by providing one simple place to record assignments
and turn deadlines into actionable work.

## 1.4 Product Promise

Within a few seconds of opening the dashboard, the user should be able
to answer:

1.  What do I need to work on?
2.  Which task is most urgent?
3.  When is it due?

------------------------------------------------------------------------

# 2. Target User

## Primary User

Students who regularly receive homework, projects, reports,
presentations, exercises, and other academic assignments.

## User Characteristics

-   Often manages multiple subjects simultaneously
-   Has many deadlines
-   May forget assignments
-   Needs a fast way to record tasks
-   Wants visual clarity rather than complicated project-management
    features
-   Uses both desktop and mobile browsers

------------------------------------------------------------------------

# 3. MVP Goals

The MVP must prove that TASKORA can:

1.  Let a user create an account and sign in.
2.  Let a user create subjects.
3.  Let a user quickly create tasks.
4.  Store deadlines accurately.
5.  Show upcoming and urgent tasks.
6.  Let users break tasks into subtasks.
7.  Track task progress.
8.  Show tasks on a calendar.
9.  Allow search and filtering.
10. Display in-app reminder popups.
11. Support browser notifications where permission and browser
    capabilities allow.
12. Work well on desktop and mobile.
13. Maintain a consistent Neo-Brutalist visual identity.

------------------------------------------------------------------------

# 4. Non-Goals for MVP

Do NOT build these unless required by the architecture:

-   Social features
-   Team collaboration
-   Chat
-   Public task sharing
-   AI tutor
-   AI-generated homework answers
-   Complex gamification
-   Marketplace
-   Native Android/iOS apps
-   Google Classroom integration
-   Full Google Calendar synchronization
-   Complex recurring task engine
-   Advanced analytics
-   Autonomous AI planning
-   File collaboration
-   Real-time multiplayer editing

These can become future versions.

------------------------------------------------------------------------

# 5. Core User Flow

``` text
Landing Page
    ↓
Register / Login
    ↓
Onboarding
    ↓
Create Subjects
    ↓
Dashboard
    ↓
Add Task
    ↓
Set Subject + Deadline + Priority
    ↓
Optional Subtasks
    ↓
Task appears in Dashboard + Calendar
    ↓
Urgency system evaluates deadline
    ↓
Reminder is scheduled
    ↓
User works on task
    ↓
Subtasks completed
    ↓
Progress updates
    ↓
Task marked completed
```

------------------------------------------------------------------------

# 6. Information Architecture

``` text
TASKORA
│
├── Dashboard
│   ├── Greeting
│   ├── Statistics
│   ├── Urgent Tasks
│   ├── Today's Tasks
│   └── Upcoming Tasks
│
├── Tasks
│   ├── Search
│   ├── Filters
│   ├── Task List
│   └── Task Detail
│
├── Calendar
│   ├── Month View
│   └── Day Details
│
├── Notifications
│   └── Notification Center
│
└── Settings
    ├── Profile
    ├── Subjects
    ├── Notification Settings
    └── Appearance
```

------------------------------------------------------------------------

# 7. Navigation

## Desktop

Use a left sidebar.

``` text
┌──────────────────────────────────────────────┐
│ TASKORA                                      │
├───────────────┬──────────────────────────────┤
│ 🏠 Dashboard  │                              │
│ 📋 Tasks      │         MAIN CONTENT         │
│ 📅 Calendar   │                              │
│ 🔔 Alerts     │                              │
│               │                              │
│ ⚙ Settings   │                              │
└───────────────┴──────────────────────────────┘
```

## Mobile

Use a bottom navigation bar:

``` text
┌─────────────────────────────┐
│         MAIN CONTENT        │
│                             │
├─────────────────────────────┤
│ 🏠    📋    ＋    📅    ⚙ │
└─────────────────────────────┘
```

The Add Task action should be visually prominent.

------------------------------------------------------------------------

# 8. Visual Design Direction

## 8.1 Design Style

Primary visual direction:

**Neo-Brutalism + Student Productivity + Playful Editorial UI**

Use the provided visual reference image as the primary visual
inspiration.

The reference should guide the visual language but must NOT be copied
pixel-for-pixel.

Characteristics:

-   Thick black borders
-   Hard offset shadows
-   Strong typography
-   Pastel backgrounds
-   High-contrast accent colors
-   Large cards
-   Slightly rounded corners
-   Bold buttons
-   Playful decorative shapes
-   Generous whitespace
-   Clear information hierarchy

The application should feel:

-   Bold
-   Friendly
-   Energetic
-   Memorable
-   Simple
-   Tactile

Avoid making it look like a generic SaaS dashboard.

## 8.2 Design Principle

> **Bold enough to remember. Simple enough to use every day.**

Indonesian interpretation:

> **Berani dilihat, mudah digunakan.**

------------------------------------------------------------------------

# 9. Color System

Initial color palette:

``` text
Background:
#FFF7F2

Primary Red:
#E94B43

Yellow:
#FFD447

Blue:
#72C7ED

Green:
#A8E063

Purple:
#B59AFF

Black:
#171313

White:
#FFFFFF
```

Suggested semantic usage:

``` text
URGENT / ERROR
→ Red

UPCOMING / WARNING
→ Yellow

INFORMATION
→ Blue

COMPLETED / SUCCESS
→ Green

SPECIAL ACCENT
→ Purple
```

Do not use every color simultaneously.

Target visual balance:

-   \~70% neutral background / black / white
-   \~20% pastel cards
-   \~10% strong accent colors

Color must never be the only indicator of status. Pair important states
with text or icons.

------------------------------------------------------------------------

# 10. Typography

Preferred font direction:

-   Headings: Space Grotesk
-   Body/UI: Inter

Alternative acceptable fonts:

-   Plus Jakarta Sans
-   DM Sans
-   Archivo

Typography rules:

-   Headings may use font-weight 800--900.
-   Body text should remain highly readable.
-   Avoid excessive all-caps text.
-   Buttons may use bold uppercase labels.
-   Maintain strong contrast.

------------------------------------------------------------------------

# 11. Borders and Shadows

This is a core part of the product identity.

Default card:

``` css
border: 3px solid #171313;
box-shadow: 6px 6px 0 #171313;
```

Buttons:

``` css
border: 3px solid #171313;
box-shadow: 5px 5px 0 #171313;
```

Hover:

-   Slight upward/side movement.
-   Shadow remains visible.

Pressed:

-   Reduce or eliminate offset shadow.
-   Translate element toward its resting position.

Do not use soft, blurred shadows as the primary visual treatment.

------------------------------------------------------------------------

# 12. Dashboard Requirements

Dashboard is the most important page.

It must answer:

-   What should I do?
-   What is urgent?
-   What is coming next?

## 12.1 Greeting

Example:

``` text
HEY, FARDHAN! 👋
Mari bereskan tugasmu.
```

The greeting should adapt to the current time where appropriate.

## 12.2 Statistics

Show three compact cards:

``` text
07
TUGAS AKTIF

03
MENDESAK

05
SELESAI
```

Statistics must be calculated from actual user data.

## 12.3 Urgent Task Section

Show the highest-priority task requiring attention.

Example:

``` text
🔥 YANG HARUS DIKERJAKAN

LAPORAN PRAKTIKUM KIMIA
Kimia

████████████░░░░ 75%

DEADLINE BESOK

[ LANJUTKAN → ]
```

## 12.4 Upcoming Tasks

Show a compact list/card grid of upcoming tasks.

Each card should display:

-   Task title
-   Subject
-   Deadline
-   Priority/status
-   Progress
-   Quick action

------------------------------------------------------------------------

# 13. Task Model

Every task should support:

-   Title
-   Description
-   Subject
-   Deadline date
-   Deadline time
-   Priority
-   Status
-   Estimated duration
-   Subtasks
-   Progress
-   Created date
-   Completed date

## 13.1 Task Status

Use three primary statuses:

``` text
TODO
IN_PROGRESS
COMPLETED
```

Visual labels:

``` text
⚪ Belum mulai
🔵 Sedang dikerjakan
🟢 Selesai
```

------------------------------------------------------------------------

# 13. Authentication & User Accounts

Authentication is a **mandatory MVP feature** in V2.

TASKORA must not rely on localStorage as the primary source of truth for
user tasks. User data must be persisted in a real database associated
with an authenticated account.

## 13.1 Authentication Methods

MVP should support:

-   Email + password
-   Google Sign-In, if supported cleanly by the selected managed
    authentication provider
-   Logout
-   Persistent session
-   Password reset / recovery
-   Appropriate email verification flow if required by the chosen
    provider

Do not build password hashing, session security, OAuth, or token
management from scratch when a reputable managed authentication provider
can provide it.

## 13.2 Authentication Flow

### New User

``` text
Landing Page
    ↓
Register
    ↓
Create Auth Account
    ↓
Optional Email Verification
    ↓
Onboarding
    ↓
Create / Select Subjects
    ↓
Dashboard
```

### Returning User

``` text
Landing / Login
    ↓
Authenticate
    ↓
Restore Session
    ↓
Dashboard
    ↓
Load User-Owned Data
```

### Logout

``` text
Dashboard
    ↓
Settings / Account Menu
    ↓
Logout
    ↓
Session Cleared
    ↓
Login / Landing Page
```

## 13.3 Login UI

The login screen must use the same Neo-Brutalist visual system as the
rest of the product.

Example:

``` text
TASKORA ✦

ATUR TUGASMU.
TAKLUKKAN DEADLINE.

EMAIL
[ kamu@email.com ]

PASSWORD
[ ••••••••• ]

[ MASUK → ]

──────── ATAU ────────

[ G  LANJUTKAN DENGAN GOOGLE ]

Belum punya akun? DAFTAR
```

## 13.4 Registration UI

``` text
BUAT AKUN

NAMA
[ Nama kamu ]

EMAIL
[ kamu@email.com ]

PASSWORD
[ ••••••••• ]

KONFIRMASI PASSWORD
[ ••••••••• ]

[ BUAT AKUN → ]

──────── ATAU ────────

[ G  DAFTAR DENGAN GOOGLE ]

Sudah punya akun? MASUK
```

## 13.5 Account Requirements

The authenticated user should have:

-   id
-   name / display name
-   email
-   avatar if available
-   timezone
-   createdAt

The auth provider's canonical user ID must be used as the stable
identity key.

Do not use email as the primary relational key.

## 13.6 Session Requirements

The application must:

-   Restore a valid session after page refresh.
-   Protect authenticated routes.
-   Redirect unauthenticated users to login when they attempt to access
    private pages.
-   Redirect authenticated users away from login/register when
    appropriate.
-   Handle expired sessions gracefully.
-   Never expose access tokens or secrets unnecessarily to client-side
    code.

## 13.7 Authenticated Route Model

Public routes:

``` text
/
 /login
 /register
 /forgot-password
```

Private routes:

``` text
/dashboard
/tasks
/tasks/:id
/calendar
/notifications
/settings
```

The exact route syntax may differ based on the chosen framework.

## 13.8 User Data Isolation

Every user-owned record must be associated with the authenticated user,
directly or through a secure parent relationship.

Conceptually:

``` text
Authenticated User
        │
        ├── Subjects
        │
        ├── Tasks
        │      └── Subtasks
        │
        └── Reminders
```

User A must never be able to read or mutate User B's records, even by
manually changing an ID in a URL or API request.

Authorization must be enforced server-side / at the database security
layer, not only by hiding UI elements.

## 13.9 Account Settings

MVP Settings should include:

-   Display name
-   Email display
-   Timezone
-   Notification preferences
-   Logout
-   Password/account recovery entry point where applicable

Changing email or other security-sensitive account fields should use the
auth provider's supported secure flow.

# 15. Add Task Flow

The Add Task interface must be fast.

Required fields:

``` text
Task Title
Subject
Deadline Date
Deadline Time
Priority
```

Optional fields:

``` text
Description
Estimated Duration
Subtasks
```

Example:

``` text
TAMBAH TUGAS

APA TUGASNYA?
[ Laporan Praktikum Kimia ]

MATA PELAJARAN
[ 🧪 KIMIA ▼ ]

DEADLINE
[ 05 OKTOBER ] [ 23:59 ]

PRIORITAS
[ RENDAH ] [ SEDANG ] [ 🔥 TINGGI ]

ESTIMASI
[ 2 jam ]

SUBTASK
☐ Kerjakan teori
☐ Masukkan hasil
☐ Buat pembahasan
☐ Kesimpulan

[ SIMPAN TUGAS → ]
```

Do not make every field mandatory.

------------------------------------------------------------------------

# 16. Quick Add

MVP should support a lightweight Quick Add experience.

Example user input:

``` text
Laporan kimia - besok jam 8 malam
```

The application may parse:

``` text
Title:
Laporan kimia

Deadline:
Tomorrow at 20:00
```

Another example:

``` text
Matematika halaman 45 Jumat
```

The system may infer:

``` text
Title:
Matematika halaman 45

Deadline:
Friday
```

If parsing is ambiguous, ask the user to confirm instead of silently
creating an incorrect deadline.

For MVP, simple deterministic parsing is acceptable. Do not make an LLM
dependency mandatory.

------------------------------------------------------------------------

# 17. Task Detail

Task detail should include:

``` text
← KEMBALI

LAPORAN PRAKTIKUM KIMIA

Kimia
Deadline: 05 Oktober 2026, 23:59

████████████░░░░ 75%

SUBTASKS

☑ Cari teori
☑ Buat tabel hasil
☑ Masukkan data
□ Pembahasan
□ Kesimpulan

DESKRIPSI
...

ESTIMASI
2 jam

[ TANDAI SELESAI ]
```

Progress is calculated from completed subtasks.

Formula:

``` text
progress =
completed_subtasks / total_subtasks * 100
```

If there are no subtasks, progress may be based on status:

-   TODO = 0%
-   IN_PROGRESS = 50%
-   COMPLETED = 100%

------------------------------------------------------------------------

# 18. Urgency System

MVP urgency should be deterministic and understandable.

Suggested rules:

``` text
COMPLETED
→ Completed

Deadline < 0
→ OVERDUE

Deadline <= 24 hours
→ URGENT

Deadline > 24 hours AND <= 72 hours
→ SOON

Deadline > 72 hours
→ UPCOMING
```

Urgency must be recalculated using the user's timezone.

Urgency should affect:

-   Dashboard ordering
-   Visual badge
-   Reminder content
-   Calendar indicators

Urgency should NOT automatically change the user's chosen priority.

------------------------------------------------------------------------

# 19. Priority System

User-controlled priority:

``` text
LOW
MEDIUM
HIGH
```

Suggested visual:

``` text
LOW
🟢

MEDIUM
🟡

HIGH
🔴
```

Priority and urgency are different concepts.

Example:

A user can mark a task as HIGH priority even if the deadline is two
weeks away.

------------------------------------------------------------------------

# 20. Calendar

MVP calendar should support month view.

Requirements:

-   Previous/next month
-   Current date indicator
-   Task indicators
-   Urgency indicators
-   Clicking a date displays tasks
-   Clicking a task opens Task Detail

Example:

``` text
OCTOBER 2026

MON TUE WED THU FRI SAT SUN
            1   2   3   4
            •   •
5   6   7   8   9   10  11
🔴      🟡
```

Do not build drag-and-drop calendar scheduling in MVP.

------------------------------------------------------------------------

# 21. Notification System

Notifications are a core MVP feature.

## 20.1 In-App Popup

When the application is open, show a custom Neo-Brutalist popup.

Example:

``` text
┌────────────────────────────────────┐
│ 🔔 DEADLINE BESOK                  │
│                                    │
│ LAPORAN KIMIA                      │
│ Jumat, 23:59                       │
│                                    │
│ [ BUKA TUGAS → ]                  │
│                                    │
└────────────────────────────────────┘
       █████████
```

Popup characteristics:

-   Fixed position
-   Desktop: bottom-right
-   Mobile: top/bottom safe area
-   Thick border
-   Hard shadow
-   Accent background
-   Accessible close button
-   Optional action button

## 20.2 Reminder Timing

Initial reminder schedule:

``` text
H-1 day
→ "Deadline besok"

3 hours before deadline
→ "Deadline 3 jam lagi"

30 minutes before deadline
→ "Deadline 30 menit lagi"

After deadline
→ "Tugas terlambat"
```

Users should be able to turn reminder types on/off.

Avoid excessive notifications.

## 20.3 Browser Notifications

Where browser permission and platform support allow it:

-   Ask user permission before sending browser notifications.
-   Use the Notifications API and Service Worker architecture where
    appropriate.
-   Do not repeatedly ask for permission after denial.
-   Explain why notification permission is useful.

Example:

``` text
🔔 TASKORA

Deadline besok:
Laporan Praktikum Kimia

23:59
```

## 20.4 Notification Center

Add a small notification bell in the header.

Clicking it opens a notification panel containing:

-   Unread reminders
-   Read reminders
-   Date/time
-   Related task
-   Mark as read

------------------------------------------------------------------------

# 22. Notification Data Model

Suggested structure:

``` text
Reminder
├── id
├── userId
├── taskId
├── remindAt
├── type
├── channel
├── sent
├── read
└── createdAt
```

Where:

``` text
type:
DEADLINE_1_DAY
DEADLINE_3_HOURS
DEADLINE_30_MINUTES
OVERDUE

channel:
IN_APP
BROWSER
```

------------------------------------------------------------------------

# 23. Subjects

Users can create custom subjects.

Examples:

``` text
Matematika
Fisika
Kimia
Biologi
Bahasa Indonesia
Bahasa Inggris
Informatika
```

Subject model:

``` text
Subject
├── id
├── userId
├── name
├── color
└── createdAt
```

Users should be able to:

-   Create
-   Rename
-   Delete

Deleting a subject must not silently delete its tasks. Require a safe
migration choice such as assigning tasks to "No Subject" or selecting
another subject.

------------------------------------------------------------------------

# 24. Search and Filtering

Tasks page must support:

## Search

Search by:

-   Title
-   Description
-   Subject

## Filters

``` text
Status:
All / Todo / In Progress / Completed

Priority:
All / Low / Medium / High

Subject:
All / specific subject

Urgency:
All / Urgent / Soon / Upcoming / Overdue
```

## Sorting

``` text
Deadline nearest
Deadline farthest
Newest
Oldest
Priority
```

------------------------------------------------------------------------

# 25. Onboarding

First-time user experience:

### Step 1

``` text
SELAMAT DATANG! 👋

Mari rapikan tugasmu.
```

### Step 2

Allow adding common subjects.

### Step 3

Explain the dashboard.

### Step 4

Offer browser notifications.

Do not force notification permission immediately on first page load.
Explain the value first.

------------------------------------------------------------------------

# 26. Empty States

Every major section needs a designed empty state.

Example:

``` text
TUGASMU MASIH KOSONG

Nikmati ketenangan...
atau tambahkan tugas pertamamu.

[ + TAMBAH TUGAS ]
```

Avoid generic blank screens.

------------------------------------------------------------------------

# 27. Loading States

Use skeleton/loading states that match the Neo-Brutalist design.

Do not block the entire application for small operations.

For mutations:

-   Show immediate visual feedback.
-   Disable the relevant button briefly while saving.
-   Display success/error feedback.

------------------------------------------------------------------------

# 28. Error Handling

Errors should be human-readable.

Bad:

``` text
500 Internal Server Error
```

Better:

``` text
Yah, tugasnya belum berhasil disimpan.

Coba lagi.
```

For network problems:

``` text
Koneksi sedang bermasalah.
Periksa internetmu lalu coba lagi.
```

Never silently lose user-entered task data.

------------------------------------------------------------------------

# 29. Responsive Design

Must support:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

Desktop:

-   Sidebar navigation
-   Multi-column cards where appropriate

Mobile:

-   Bottom navigation
-   Single-column task layout
-   Large touch targets
-   Popup adapted to viewport
-   Add Task accessible with one tap

Minimum comfortable touch target:

``` text
~44px
```

Avoid horizontal scrolling except where genuinely necessary.

------------------------------------------------------------------------

# 30. Accessibility

MVP must include:

-   Semantic HTML
-   Keyboard navigation
-   Visible focus states
-   Sufficient text contrast
-   Labels for form fields
-   Accessible dialogs
-   Accessible buttons
-   Do not rely on color alone
-   Escape key closes dialogs where appropriate
-   Screen-reader-friendly status labels

Neo-Brutalism must not compromise accessibility.

------------------------------------------------------------------------

# 32. Suggested Data Model

The database must model authenticated ownership explicitly.

## User Profile

The authentication provider owns the canonical auth identity. TASKORA
may maintain a profile table linked by the provider user ID.

``` text
Profile
├── id
├── userId            # auth provider user ID, unique
├── name
├── avatar
├── timezone
└── createdAt
```

## Subject

``` text
Subject
├── id
├── userId
├── name
├── color
└── createdAt
```

## Task

``` text
Task
├── id
├── userId
├── subjectId
├── title
├── description
├── status
├── priority
├── deadline
├── estimatedMinutes
├── createdAt
├── updatedAt
└── completedAt
```

## Subtask

``` text
Subtask
├── id
├── taskId
├── title
├── completed
├── order
├── createdAt
└── updatedAt
```

## Reminder

``` text
Reminder
├── id
├── userId
├── taskId
├── remindAt
├── type
├── channel
├── sent
├── read
├── createdAt
└── sentAt
```

## Notification Preference

``` text
NotificationPreference
├── id
├── userId
├── inAppEnabled
├── browserEnabled
├── oneDayBefore
├── threeHoursBefore
├── thirtyMinutesBefore
└── overdueEnabled
```

## Relationships

``` text
Profile 1 ─── * Subject
Profile 1 ─── * Task
Subject 1 ─── * Task
Task 1 ─── * Subtask
Task 1 ─── * Reminder
Profile 1 ─── 1 NotificationPreference
```

Use foreign keys, indexes, and appropriate delete/update behavior.

Recommended indexes include:

-   Task(userId, deadline)
-   Task(userId, status)
-   Task(userId, subjectId)
-   Reminder(userId, remindAt, sent)
-   Subtask(taskId, order)

Do not use email addresses as relational keys.

# 33. Suggested Technical Architecture

The exact stack may be chosen by the coding agent based on the available
environment, but the architecture should follow these principles:

``` text
Browser
  │
  ├── Public UI
  │     ├── Landing
  │     ├── Login
  │     └── Register
  │
  └── Authenticated App
        ├── Dashboard
        ├── Tasks
        ├── Calendar
        ├── Notifications
        └── Settings
                 │
                 ▼
          Auth / Application Layer
                 │
          ┌──────┼──────────┐
          │      │          │
        Auth   Task CRUD   Reminder Logic
          │      │          │
          └──────┼──────────┘
                 ▼
          Managed Database
                 │
                 ▼
       Notification Infrastructure
```

Prefer a managed authentication + database platform when practical.

Potential stack:

``` text
Next.js
TypeScript
React
Tailwind CSS
Managed Auth
Managed PostgreSQL / Supabase-like backend
```

Equivalent technologies are acceptable if they provide:

-   Secure authentication
-   Persistent sessions
-   Relational data
-   Server-side authorization
-   Row/user-level data isolation
-   Reliable database access
-   Reasonable local development experience

Do not build authentication infrastructure from scratch unless there is
a compelling technical reason.

## 33.1 Authorization Boundary

Every authenticated request that accesses user-owned data must establish
the current user identity before reading or mutating records.

Conceptually:

``` text
request
  ↓
authenticate session
  ↓
resolve userId
  ↓
authorize resource ownership
  ↓
database query/mutation
```

Never trust a client-provided userId.

If the selected database supports row-level security, use it for defense
in depth.

## 33.2 Persistence Requirement

The following data must survive:

-   Page refresh
-   Browser restart
-   Logout/login
-   Normal return visits
-   Access from another supported device using the same account

At minimum:

``` text
Subjects
Tasks
Subtasks
Task status
Task priority
Deadlines
Notification preferences
Reminder records
```

Local storage may be used for harmless UI preferences, but must not
replace the database for core task data.

## 33.3 Notification Architecture

In-app notifications can be triggered while the app is active.

For reminders that must be delivered when the app is not open, use a
backend/server-side scheduling mechanism and browser push infrastructure
where supported.

Do not rely solely on a browser tab's JavaScript timer for reliable
future reminders.

The exact implementation may use:

-   Scheduled jobs
-   Cron
-   Queue workers
-   Database-backed reminder polling
-   Web Push
-   Service Worker

Choose the simplest reliable architecture available in the selected
stack.

# 33. Component Architecture

Suggested components:

``` text
components/
├── ui/
│   ├── Button
│   ├── Card
│   ├── Badge
│   ├── Dialog
│   ├── Input
│   ├── Select
│   └── ProgressBar
│
├── task/
│   ├── TaskCard
│   ├── TaskForm
│   ├── TaskList
│   ├── TaskDetail
│   ├── TaskProgress
│   └── SubtaskList
│
├── dashboard/
│   ├── Greeting
│   ├── StatsCards
│   ├── UrgentTask
│   ├── TodayTasks
│   └── UpcomingTasks
│
├── calendar/
│   ├── Calendar
│   ├── CalendarDay
│   └── DayTasks
│
└── notifications/
    ├── NotificationBell
    ├── NotificationPanel
    └── NotificationPopup
```

Components should be reusable and not duplicated unnecessarily.

------------------------------------------------------------------------

# 34. UX Rules

1.  Adding a task should be fast.
2.  Never hide the deadline.
3.  Urgent information should be visually prominent.
4.  The dashboard should not become visually noisy.
5.  Use progressive disclosure for optional information.
6.  Avoid excessive modal dialogs.
7.  Confirm destructive actions.
8.  Preserve user input when validation fails.
9.  Always provide feedback after save/delete/update.
10. Use consistent terminology everywhere.

------------------------------------------------------------------------

# 35. Micro-interactions

Use subtle tactile animations:

-   Button press
-   Card hover
-   Checkbox completion
-   Progress update
-   Notification entrance
-   Modal entrance
-   Toast feedback

Animation guidelines:

-   Fast
-   Subtle
-   Purposeful

Avoid:

-   Excessive bouncing
-   Long transitions
-   Distracting animations
-   Animations that block interaction

------------------------------------------------------------------------

# 36. Notification Popup UX

Notification popup should:

-   Enter from bottom-right on desktop
-   Use a short slide/fade animation
-   Have clear hierarchy
-   Be dismissible
-   Allow opening the associated task
-   Never cover critical controls for too long
-   Support multiple notifications without creating an unreadable stack

If multiple notifications exist, group them where appropriate.

------------------------------------------------------------------------

# 37. Security Requirements

-   Users can only access their own tasks.
-   Users can only modify their own subjects.
-   Users can only access their own reminders.
-   Validate input server-side.
-   Do not trust client-side authorization.
-   Never expose secrets in frontend code.
-   Sanitize user-generated text where required.
-   Use secure authentication mechanisms provided by the chosen backend.

------------------------------------------------------------------------

# 38. Timezone Requirements

Deadline handling is critical.

Store timestamps in a consistent server/database format.

Display times using the user's configured timezone.

Default timezone should be detected where possible and confirmed during
onboarding/settings.

For Indonesia, common examples include:

``` text
Asia/Jakarta
Asia/Makassar
Asia/Jayapura
```

Do not hard-code Indonesia as the only supported timezone.

------------------------------------------------------------------------

# 39. Performance Requirements

The dashboard should feel fast.

Goals:

-   Avoid unnecessary full-page reloads.
-   Use optimistic UI where safe.
-   Lazy-load non-critical features.
-   Avoid expensive calendar calculations on every render.
-   Paginate or virtualize large task lists if necessary.
-   Keep initial bundle reasonable.

------------------------------------------------------------------------

# 40. MVP Acceptance Criteria

The MVP is considered functional when a test user can:

### Authentication

-   Register
-   Log in
-   Log out
-   Maintain a session

### Subjects

-   Create a subject
-   Rename a subject
-   Delete a subject safely

### Tasks

-   Create a task
-   Edit a task
-   Delete a task
-   Set deadline
-   Set priority
-   Set status
-   Add description
-   Add estimated duration

### Subtasks

-   Create subtasks
-   Complete subtasks
-   Uncomplete subtasks
-   See automatic progress

### Dashboard

-   See active tasks
-   See urgent tasks
-   See today's tasks
-   See upcoming tasks
-   See task statistics

### Calendar

-   See tasks by date
-   Navigate months
-   Open task details

### Search

-   Search tasks
-   Filter tasks
-   Sort tasks

### Notifications

-   Configure reminders
-   Show in-app reminder popup
-   Open related task from popup
-   Mark notification as read
-   Request browser notification permission
-   Send browser notifications where supported

### Responsive

-   Works on desktop
-   Works on mobile
-   No major layout overflow

------------------------------------------------------------------------

# 41. Development Phases

## Phase 1 --- Foundation

Build:

-   Project setup
-   Design tokens
-   Typography
-   Global layout
-   Navigation
-   Authentication
-   Database connection

## Phase 2 --- Task Core

Build:

-   Subjects
-   Create task
-   Edit task
-   Delete task
-   Task detail
-   Status
-   Priority

## Phase 3 --- Progress

Build:

-   Subtasks
-   Progress calculation
-   Completion flow

## Phase 4 --- Planning

Build:

-   Dashboard
-   Today section
-   Upcoming section
-   Calendar
-   Search
-   Filters

## Phase 5 --- Notifications

Build:

-   Reminder model
-   Reminder scheduling
-   In-app popup
-   Notification center
-   Browser notification support

## Phase 6 --- Polish

Build:

-   Responsive layouts
-   Empty states
-   Loading states
-   Error states
-   Accessibility
-   Micro-interactions
-   Performance improvements

------------------------------------------------------------------------

# 42. Vibe Coding Rules for Google Antigravity

The coding agent must follow these rules:

## Rule 1 --- Do not build everything at once

Implement incrementally by phase.

## Rule 2 --- Preserve architecture

Before adding a feature, inspect existing components and reuse them.

Do not create duplicate components for the same purpose.

## Rule 3 --- Keep business logic separate from UI

For example:

``` text
calculateUrgency()
calculateProgress()
getUpcomingTasks()
```

should not be buried inside large UI components.

## Rule 4 --- Validate after each feature

After each major phase:

-   Run type checks
-   Run lint
-   Run tests where configured
-   Verify build
-   Fix regressions

## Rule 5 --- Do not invent dependencies unnecessarily

Only add a dependency when it solves a real problem.

## Rule 6 --- Do not replace working infrastructure without reason

If the existing stack is working, build on top of it.

## Rule 7 --- Mobile must be considered from the beginning

Do not create desktop first and attempt to "fix mobile" at the end.

------------------------------------------------------------------------

# 43. Visual Quality Gate

Before declaring a page complete, check:

### Visual

-   Does it look Neo-Brutalist?
-   Are borders consistent?
-   Are hard shadows consistent?
-   Is typography strong?
-   Is there enough whitespace?
-   Is the visual hierarchy obvious?

### UX

-   Can the user understand what to do immediately?
-   Is the primary action obvious?
-   Are deadlines easy to scan?
-   Is urgent information prominent?

### Responsive

-   Does it work on mobile?
-   Are buttons large enough?
-   Does the navigation work?
-   Do popups fit the viewport?

### Accessibility

-   Can the interface be navigated by keyboard?
-   Are labels available?
-   Is text readable?
-   Are important states communicated without relying only on color?

------------------------------------------------------------------------

# 44. Future Roadmap

After MVP validation:

## V1.1

-   Recurring tasks
-   Better quick-add parsing
-   PWA support
-   Improved browser push notifications
-   More reminder schedules

## V2

-   Smart daily planning
-   Weekly planning
-   Pomodoro
-   Study statistics
-   Streaks
-   Calendar integration

## V3

Potential intelligent planning:

``` text
User Tasks
    ↓
Deadline
    ↓
Estimated Duration
    ↓
Available Study Time
    ↓
Smart Schedule
    ↓
Daily Plan
```

Example:

``` text
TODAY'S PLAN

16:00–17:00
Matematika

19:00–20:30
Kimia

20:30–21:00
Istirahat

21:00–22:00
Bahasa Indonesia
```

This should be treated as a future feature, not an MVP dependency.

------------------------------------------------------------------------

# 45. Final Product Definition

TASKORA MVP is a responsive student task-management web app with:

-   Fast task capture
-   Subjects
-   Deadlines
-   Priority
-   Status
-   Subtasks
-   Progress tracking
-   Dashboard
-   Calendar
-   Search and filtering
-   In-app reminder popups
-   Browser notification support
-   Neo-Brutalist visual design

The central experience is:

> **Open the app → immediately understand what matters → work on it →
> get reminded before the deadline → mark it complete.**

The product should be visually distinctive but never sacrifice usability
for style.

------------------------------------------------------------------------

# 46. First Build Instruction for Antigravity

Start by creating the project foundation and design system.

Do NOT implement the entire product in one step.

First implement:

1.  Application shell
2.  Responsive navigation
3.  Neo-Brutalist design tokens
4.  Typography
5.  Reusable Button/Card/Badge/Input/Dialog components
6.  Dashboard visual prototype using mock data
7.  Responsive mobile layout

After that foundation is visually validated, proceed to authentication
and real data.

Use this PRD as the source of truth. When implementation details are
ambiguous, prefer:

**simple → maintainable → accessible → responsive → visually
consistent**

over unnecessary complexity.
