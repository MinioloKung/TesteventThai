# Project Context: User Management Web Application (ReqRes.in API)

โปรเจกต์นี้เป็นแบบทดสอบระบบการจัดการผู้ใช้ (User Management System) ที่พัฒนาขึ้นโดยการใช้ **Next.js (App Router)**, **TypeScript**, และ **Tailwind CSS** ในการดีไซน์ UI/UX ให้ดูทันสมัยและสะอาดตา

---

## 📌 เทคโนโลยีและเครื่องมือที่ใช้ (Technology Stack)

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (สำหรับ Responsive Layouts, Custom Color Palettes, และ Glassmorphic Modals)
- **API Target:** [ReqRes API](https://reqres.in/)
- **State/Auth Management:** React Context API (`AuthContext`)

---

## 🚀 ฟีเจอร์หลักของระบบ (Core Features)

1. **หน้าจอ Register (สมัครสมาชิก):**
   - หน้าจอสมัครสมาชิกพร้อม Client-side Validation (ตรวจสอบรูปแบบ Email และ Password)
   - เชื่อมต่อ API `POST /api/register` ของ ReqRes
   - แสดงผลสถานะการสมัครด้วยระบบ Toast Notification

2. **หน้าจอ Login (เข้าสู่ระบบ):**
   - หน้าจอเข้าสู่ระบบที่ปลอดภัย มีการตรวจสอบความถูกต้องก่อนส่งข้อมูล
   - เชื่อมต่อ API `POST /api/login` ของ ReqRes
   - เมื่อ Login สำเร็จ จะบันทึก Token ลงใน `localStorage` และนำทางผู้ใช้เข้าสู่หน้า Dashboard

3. **หน้าจอ List User (รายการผู้ใช้):**
   - แสดงรายชื่อผู้ใช้ทั้งหมดในรูปแบบ Grid Cards ที่ทันสมัย
   - ดึงข้อมูลจาก API `GET /api/users?page={page_number}`
   - รองรับการแบ่งหน้า (Pagination) เพื่อสลับเปลี่ยนดูข้อมูลทีละหน้า
   - มี Navbar ด้านบน และปุ่ม Action (Edit/Delete) สำหรับจัดการรายบุคคล

4. **หน้าจอ Edit User (Modal Pop-up):**
   - แก้ไขข้อมูล Name และ Job ของผู้ใช้ผ่านทาง Popup Modal
   - เชื่อมต่อ API `PUT /api/users/{id}`
   - แสดง Toast แจ้งเตือนเมื่ออัปเดตข้อมูลสำเร็จ และจำลองข้อมูลใหม่บนหน้าจอทันที

5. **หน้าจอ Delete User (Modal Pop-up):**
   - ยืนยันการลบผู้ใช้ด้วย Modal Popup เพื่อความปลอดภัย
   - เชื่อมต่อ API `DELETE /api/users/{id}`
   - แสดง Toast แจ้งเตือนเมื่อลบสำเร็จ และลบข้อมูลการแสดงผลของผู้ใช้นั้นออกชั่วคราว

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory Structure)

```text
src/
├── app/                  # โครงสร้างหน้าเพจต่างๆ ตามระเบียบ App Router
│   ├── layout.tsx        # Global layout และ Providers
│   ├── page.tsx          # หน้าแลนดิ้งเพจ (เปลี่ยนเส้นทางไป /login หรือ /dashboard)
│   ├── login/            # หน้า Login
│   ├── register/         # หน้า Register
│   └── dashboard/        # หน้าหลัก List Users และการจัดการผ่าน Modal
├── components/           # UI Components ที่ใช้ซ้ำได้
│   ├── ui/               # Components ย่อย เช่น Button, Input, Modal, Toast
│   └── Navbar.tsx        # แถบเมนูด้านบน
├── context/              # Context Providers (เช่น ระบบ Authentication)
│   └── AuthContext.tsx   # เก็บ State ของผู้ใช้และฟังก์ชัน Login/Logout
├── services/             # การจัดการการเรียก API
│   └── api.ts            # ฟังก์ชันในการ Fetch ข้อมูลจาก reqres.in
├── types/                # TypeScript Interfaces
│   └── index.ts          # ประกาศ Type ของ User, AuthResponse, และ API requests
└── hooks/                # Custom React Hooks
    └── useUsers.ts       # Hook จัดการ State ของผู้ใช้และการดึง API
```

---

## 🛠️ วิธีการรันและทดสอบระบบ (Getting Started & Execution)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันแอปพลิเคชันในโหมด Development
```bash
npm run dev
```
ระบบจะเปิดใช้งานที่ [http://localhost:3000](http://localhost:3000)

### 3. ตรวจสอบคุณภาพโค้ดและสร้าง Production Build
```bash
npm run build
```

---

## 🧼 หลักการเขียนโค้ดที่สะอาด (Clean Code Guidelines)

1. **Single Responsibility Principle (SRP):** แยก Logic การเรียก API ออกจาก UI Component โดยจัดเก็บไว้ในโฟลเดอร์ `services/` และเรียกใช้งานผ่าน custom hook `useUsers`
2. **Type Safety:** ใช้ TypeScript กำหนด Interface ให้กับข้อมูลทุกส่วนเพื่อป้องกัน Error จากการสะกดคำผิดหรือการใช้ Properties ผิดประเภท
3. **No Placeholders:** ใช้รูปภาพจริงจาก API (Avatar) และข้อมูลจริงที่มีอยู่จริงใน ReqRes เสมอ
4. **Declarative UI:** การอัปเดต UI หลังจากส่ง API PUT/DELETE จะทำผ่าน React States เพื่ออัปเดตหน้าจอทันทีแบบไม่ต้องโหลดหน้าเว็บใหม่ (Single Page Application feel)
