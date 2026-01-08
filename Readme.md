

# 🔗 URL Shortener Service

A full-stack URL Shortener application where authenticated users can generate short URLs, track click analytics, and manage their links through a dashboard.
This project is built as part of a **Full-Stack Developer assignment**.

---

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Short URL generation (6–8 character code)
* Root-level redirection with click tracking
* User-specific dashboard (My URLs)
* Free tier limit: **maximum 100 URLs per user**
* Clean MVC architecture
* Backend analytics handled securely

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* JWT Authentication

### Frontend

* React (Vite)
* TypeScript
* Axios

---

## 📦 Setup Instructions

### 🔹 Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=mongodb+srv://XXXXXXX:XXXXXX@cluster0.r22kogv.mongodb.net
PORT=5000
BCRYPT_SALT_ROUNDS=10
JWT_SECRET=your secret
JWT_ACCESS_TOKEN_EXPIRES_IN=1d
JWT_REFRESH_TOKEN_SECRET=your secret 
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173

```

> An example file is provided as `.env.example`.

### ▶️ Run Backend Server

```bash
npm run start:dev
```

Backend will run on:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

```bash
cd front-end
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── Auth/
│   │   │   └── Url/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── app.ts
│   └── server.ts
│
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.tsx
```

---

## 📚 API Documentation

### 🔐 Authentication

#### ➤ Register User

**POST**

```
http://localhost:5000/api/auth/register
```

**Request Body**

```json
{
  "fullName": "Test User",
  "email": "test@mail.com",
  "contactNumber": "+8801712345678",
  "password": "123456",
  "confirmPassword": "123456"
}
```

---

#### ➤ Login User

**POST**

```
http://localhost:5000/api/auth/login
```

**Request Body**

```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```

---

### 🔗 URL Shortener

#### ➤ Create Short URL (Authenticated)

**POST**

```
http://localhost:5000/api/urls/shorten
```

**Headers**

```
Authorization: Bearer <access_token>
```

**Request Body**

```json
{
  "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response**

```json
{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "shortCode": "IWvmuu",
    "shortUrl": "http://localhost:5000/IWvmuu",
    "remaining": 99
  }
}
```

---

#### ➤ Get My URLs (Authenticated)

**GET**

```
http://localhost:5000/api/urls/my-urls
```

---

### 🔁 Short URL Redirection

#### ➤ Redirect & Track Clicks

**GET**

```
http://localhost:5000/:shortCode
```

Example:

```
http://localhost:5000/IWvmuu
```

➡ Redirects to original URL
➡ Automatically increments click count

---

## 🧠 Design Decisions

* **MVC Pattern** used for clean separation of concerns
* **Short URL redirection handled at root level (`/:shortCode`)**
* Click analytics tracked only via redirect route
* Business rules (free limit) enforced at service layer
* Backend domain used for short URLs (best practice)
* JWT-based authentication for protected routes

---

## ⚠️ Known Limitations

* No paid subscription flow (only free tier logic)
* No URL expiration feature
* No advanced analytics (daily/geo stats)
* No rate limiting (can be added later)

---

## ✅ Verification Checklist

* ✔ Application runs on fresh installation
* ✔ All core features functional
* ✔ No sensitive data committed
* ✔ Environment variables documented
* ✔ Clean and meaningful commit history


