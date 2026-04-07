#  Interactive Wall Calendar Component

A **premium, responsive, and interactive wall calendar component** built using **Next.js (App Router), TypeScript, and Tailwind CSS**.

This project focuses on transforming a **static wall calendar design into a fully functional UI component**, emphasizing **user experience, responsiveness, and clean frontend architecture**.

---

##  Features

###  Wall Calendar Aesthetic

* Clean layout inspired by real-world wall calendars
* Hero image section acting as a visual anchor
* Modern **dark theme UI with glassmorphism effects**

---

###  Date Range Selection

* Users can select a **start date and an end date**
* Clear visual states:

  * Start date (highlighted)
  * End date (highlighted)
  * Dates in between (range shading)
* Smooth hover and scaling interactions for better UX

---

###  Notes System

* Add notes linked to selected date range
* Notes are:

  * Persisted using **localStorage**
  * Automatically retrieved when revisiting
* Simple and intuitive text input system

---

###  Navigation (Month & Year)

* Navigate between months using arrow buttons
* Select year from dropdown (supports multiple years)
* Handles edge cases like year transitions (Dec → Jan)

---

###  Fully Responsive Design

* Desktop:

  * Split layout (image + calendar panel)
* Mobile:

  * Stacked layout for better usability
* Fully touch-friendly interactions

---

##  Tech Stack

| Technology           | Purpose          |
| -------------------- | ---------------- |
| Next.js (App Router) | Framework        |
| TypeScript           | Type safety      |
| Tailwind CSS         | Styling          |
| React Hooks          | State management |
| localStorage         | Data persistence |

---

##  Getting Started

### 1. Clone the Repository

```bash id="clonecmd"
git clone https://github.com/your-username/wall-calendar-component.git
cd wall-calendar-component
```

---

### 2. Install Dependencies

```bash id="installcmd"
npm install
```

---

### 3. Run the Development Server

```bash id="runcmd"
npm run dev
```

---

### 4. Open in Browser

```id="browsercmd"
http://localhost:3000
```

---

##  Project Structure

```id="structure"
app/
 └── page.tsx        # Main calendar component

public/
 └── screenshots/    # Screenshots for README
```

---

##  Key Implementation Details

###  Calendar Logic

* Dynamically calculates:

  * Total days in month
  * First day alignment
* Uses native JavaScript `Date` API

---

###  Date Range Selection Logic

* First click → sets **start date**
* Second click → sets **end date**
* Automatically highlights the full range

---

###  Notes Persistence

```ts id="localstorage"
localStorage.setItem("calendar-notes-map", JSON.stringify(notesMap));
```

* Notes stored per date range
* Loaded on component mount

---

###  Hydration Handling (Next.js)

* Avoided SSR mismatch using:

```ts id="hydration"
const [mounted, setMounted] = useState(false);
```

* Ensures consistent rendering between server and client

---

##  Video Demonstration

 A short demo video is included showcasing:

* Date range selection
* Notes feature
* Month and year navigation
* Responsive design (desktop + mobile)

 **Demo Link:** *(Add your Loom/YouTube link here)*

---

##  Screenshots

###  Desktop View

<img width="2567" height="1401" alt="image" src="https://github.com/user-attachments/assets/b4fb9ec8-48ca-44ed-9d1f-0de647e67dea" />

---

###  Date Range Selection

<img width="2590" height="1385" alt="image" src="https://github.com/user-attachments/assets/9a30d7ab-6164-4bfb-95d4-5e47a1665fc3" />


---

###  Notes Feature

<img width="1186" height="468" alt="image" src="https://github.com/user-attachments/assets/bc98fedd-6263-429e-9af4-73c295df7893" />

---

###  Mobile View

<img width="798" height="1357" alt="image" src="https://github.com/user-attachments/assets/14dcb1be-1e68-45a4-8620-e5cfe16950e5" />

---
