# Griya MDP Backend - Dokumentasi Implementasi

## Deskripsi Project
Griya MDP Backend adalah aplikasi backend berbasis Express.js yang menyediakan REST API untuk manajemen data perumahan (housing). Aplikasi ini menggunakan MongoDB sebagai database dan mengimplementasikan arsitektur MVC (Model-View-Controller).

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js v4.16.1
- **Database**: MongoDB (MongoDB Atlas)
- **ODM**: Mongoose v8.7.1
- **Template Engine**: EJS v2.6.1
- **Development Tools**: Nodemon v3.1.7

## Struktur Project
```
griya-mdp-backend/
├── app.js                          # File utama aplikasi Express
├── package.json                    # Dependencies dan scripts
├── datahousing.json               # Data sample housing
├── bin/
│   └── www                        # Server startup script
├── app_server/
│   ├── controllers/
│   │   ├── housingcontroller.js  # Controller untuk housing
│   │   ├── mahasiswacontroller.js
│   │   └── main.js
│   ├── models/
│   │   ├── db.js                 # Konfigurasi koneksi MongoDB
│   │   └── housing.js            # Model Housing Schema
│   ├── routes/
│   │   ├── index.js              # Routes utama
│   │   └── housing.js            # Routes untuk housing API
│   └── views/
│       ├── index.ejs             # View halaman utama
│       └── error.ejs             # View halaman error
└── public/
    └── stylesheets/
        └── style.css
```

---

## Langkah-langkah Implementasi

### **Langkah 1: Persiapan Environment**

#### 1.1. Install Node.js
- Download dan install Node.js dari [nodejs.org](https://nodejs.org/)
- Verifikasi instalasi dengan perintah:
  ```bash
  node --version
  npm --version
  ```

#### 1.2. Clone Repository
```bash
git clone <repository-url>
cd griya-mdp-backend
```

### **Langkah 2: Setup Database MongoDB**

#### 2.1. Buat Akun MongoDB Atlas
1. Kunjungi [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat akun gratis atau login
3. Buat cluster baru (pilih Free Tier)

#### 2.2. Konfigurasi Database
1. Buat database dengan nama: `PAWII-SI`
2. Buat collection dengan nama: `housings`
3. Catat connection string MongoDB Atlas Anda

#### 2.3. Whitelist IP Address
1. Di MongoDB Atlas, buka **Network Access**
2. Klik **Add IP Address**
3. Pilih **Allow Access from Anywhere** (0.0.0.0/0) untuk development

#### 2.4. Update Connection String
Edit file `app_server/models/db.js`:
```javascript
let dbURI = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/PAWII-SI?retryWrites=true&w=majority";
```
> ⚠️ **Ganti** `<username>`, `<password>`, dan `<cluster>` dengan kredensial MongoDB Atlas Anda!

### **Langkah 3: Install Dependencies**

Jalankan perintah berikut untuk menginstall semua dependencies:
```bash
npm install
```

Dependencies yang akan terinstall:
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `ejs`: Template engine
- `cookie-parser`: Parse cookies
- `morgan`: HTTP request logger
- `debug`: Debugging utility
- `http-errors`: HTTP error handling
- `nodemon` (dev): Auto-restart server saat development

### **Langkah 4: Membuat Model Housing**

File: `app_server/models/housing.js`

```javascript
const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Pending', 'Sold']
    },
    type: {
        type: String,
        required: false,
        enum: ['rumah', 'apartemen', 'villa']
    },
    description: {
        type: String,
        required: false
    },
    postedDays: {
        type: Number,
        required: false,
        min: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;
```

**Penjelasan:**
- Schema disesuaikan dengan Angular Housing model
- Field utama: id, title, location, price, bedrooms, bathrooms, area
- Field pendukung: image, rating, status, type, description, postedDays
- Validasi: rating (0-5), status enum, type enum
- Timestamps otomatis untuk tracking createdAt & updatedAt

### **Langkah 5: Membuat Controller**

File: `app_server/controllers/housingcontroller.js`

```javascript
const Housing = require("../models/housing");

// Get all housing or filter by type
const Index = async (req, res) => {
    try {
        const { type } = req.query;
        
        // Build query object
        let query = {};
        if (type) {
            // Filter by type if query parameter exists
            query.type = type;
        }
        
        const housing = await Housing.find(query);
        
        if (!housing || housing.length === 0) {
            return res.status(404).json({ 
                message: "No housing found",
                data: []
            });
        }
        
        res.status(200).json(housing);
    } catch (error) {
        res.status(500).json({ 
            message: "Error retrieving housing", 
            error: error.message 
        });
    }
};

// Get housing by ID
const GetById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find housing by ID
        const housing = await Housing.findById(id);
        
        if (!housing) {
            return res.status(404).json({ 
                message: "Housing not found",
                id: id
            });
        }
        
        res.status(200).json(housing);
    } catch (error) {
        // Handle invalid ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                message: "Invalid housing ID format",
                id: req.params.id
            });
        }
        
        res.status(500).json({ 
            message: "Error retrieving housing", 
            error: error.message 
        });
    }
};

module.exports = { Index, GetById };
```

**Penjelasan:**
- `Index`: Get all housing atau filter by type (rumah, apartemen, villa)
- `GetById`: Get housing berdasarkan MongoDB ObjectId
- Support query parameter `?type=rumah` untuk filtering
- Better error handling dengan status code yang tepat
- Validasi untuk invalid ObjectId format

### **Langkah 6: Membuat Routes**

File: `app_server/routes/housing.js`

```javascript
const express = require("express");
const router = express.Router();
const housingController = require("../controllers/housingcontroller");

// Get all housing (with optional type filter via query parameter)
router.get("/", housingController.Index);

// Get housing by ID
router.get("/:id", housingController.GetById);

module.exports = router;
```

**Penjelasan:**
- Route `GET /housing` - Get all housing atau filter by type
- Route `GET /housing/:id` - Get specific housing by ID
- Query parameter `?type=rumah` untuk filtering
- RESTful API design pattern

### **Langkah 7: Konfigurasi Database Connection**

File: `app_server/models/db.js`

```javascript
let mongoose = require("mongoose");
let dbURI = "mongodb+srv://paw2:si@paw2.iendmj6.mongodb.net/PAWII-SI?retryWrites=true&w=majority&appName=paw2";

mongoose.connect(dbURI, {
    // useNewURLParser: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected To MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("Connection Error: " + error);
});

mongoose.connection.on("disconected", () => {
    console.log("Disconnected From MongoDB");
});
```

**Penjelasan:**
- Menggunakan Mongoose untuk koneksi ke MongoDB
- Event listeners untuk monitoring status koneksi
- Connection string mengarah ke MongoDB Atlas

### **Langkah 8: Konfigurasi App.js**

File: `app.js`

```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Load MongoDB connection
require('./app_server/models/db');

var indexRouter = require('./app_server/routes/index');
var housingRouter = require('./app_server/routes/housing');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/housing', housingRouter);

// 404 Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

**Penjelasan:**
- Load koneksi database saat aplikasi start
- Setup middleware untuk parsing, logging, dll
- **CORS enabled** untuk allow request dari domain lain
- Route `/housing` untuk API housing

### **Langkah 9: Insert Sample Data**

#### 9.1. Menggunakan MongoDB Compass
1. Download dan install [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect menggunakan connection string Anda
3. Pilih database `PAWII-SI`
4. Buat/pilih collection `housings`
5. Import data dari file `datahousing.json`

#### 9.2. Format Data Sample
Contoh dokumen dalam collection `housings`:
```json
{
  "id": 1,
  "title": "Griya Asri Residence",
  "location": "Jakarta Selatan",
  "price": 850000000,
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 120,
  "image": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
  "rating": 4.5,
  "status": "Available",
  "type": "rumah",
  "description": "Hunian modern dengan desain minimalis di kawasan Jakarta Selatan yang strategis.",
  "postedDays": 2
}
```

### **Langkah 10: Running Application**

#### 10.1. Development Mode (dengan auto-restart)
```bash
npm run dev
```

#### 10.2. Production Mode
```bash
npm start
```

Server akan berjalan di: **http://localhost:3000**

### **Langkah 11: Testing API**

#### 11.1. Menggunakan Browser
Buka browser dan akses:
```
http://localhost:3000/housing
```

#### 11.2. Menggunakan Postman
1. Download dan install [Postman](https://www.postman.com/downloads/)
2. Buat request baru:
   - **Method**: GET
   - **URL**: `http://localhost:3000/housing`
3. Klik **Send**

#### 11.3. Menggunakan cURL
```bash
curl http://localhost:3000/housing
```

#### 11.4. Expected Response
```json
[
  {
    "_id": "673b1234567890abcdef1234",
    "id": 1,
    "title": "Griya Asri Residence",
    "location": "Jakarta Selatan",
    "price": 850000000,
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 120,
    "image": "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "rating": 4.5,
    "status": "Available",
    "type": "rumah",
    "description": "Hunian modern dengan desain minimalis",
    "postedDays": 2,
    "createdAt": "2025-11-13T08:00:00.000Z",
    "updatedAt": "2025-11-13T08:00:00.000Z",
    "__v": 0
  },
  ...
]
```

---

## API Endpoints

### 1. GET /housing
Mengambil semua data housing

**Request:**
```http
GET http://localhost:3000/housing
```

**Response (Success - 200):**
```json
[
  {
    "_id": "673b1234567890abcdef1234",
    "id": 1,
    "title": "Griya Asri Residence",
    "location": "Jakarta Selatan",
    "price": 850000000,
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 120,
    "image": "https://images.unsplash.com/...",
    "rating": 4.5,
    "status": "Available",
    "type": "rumah",
    "description": "Hunian modern...",
    "postedDays": 2
  }
]
```

**Response (Not Found - 404):**
```json
{
  "message": "No housing found",
  "data": []
}
```

**Response (Error - 500):**
```json
{
  "message": "Error retrieving housing",
  "error": "..."
}
```

---

### 2. GET /housing/:id
Mengambil data housing berdasarkan MongoDB ObjectId

**Request:**
```http
GET http://localhost:3000/housing/673b1234567890abcdef1234
```

**Response (Success - 200):**
```json
{
  "_id": "673b1234567890abcdef1234",
  "id": 1,
  "title": "Griya Asri Residence",
  "location": "Jakarta Selatan",
  "price": 850000000,
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 120,
  "image": "https://images.unsplash.com/...",
  "rating": 4.5,
  "status": "Available",
  "type": "rumah",
  "description": "Hunian modern...",
  "postedDays": 2
}
```

**Response (Not Found - 404):**
```json
{
  "message": "Housing not found",
  "id": "673b1234567890abcdef1234"
}
```

**Response (Invalid ID - 400):**
```json
{
  "message": "Invalid housing ID format",
  "id": "invalid-id"
}
```

---

### 3. GET /housing?type={type}
Filter housing berdasarkan tipe properti

**Request:**
```http
GET http://localhost:3000/housing?type=rumah
```

**Supported Types:**
- `rumah` - Rumah/House
- `apartemen` - Apartment
- `villa` - Villa

**Response (Success - 200):**
```json
[
  {
    "_id": "...",
    "id": 1,
    "title": "Griya Asri Residence",
    "type": "rumah",
    ...
  },
  {
    "_id": "...",
    "id": 2,
    "title": "Taman Indah Village",
    "type": "rumah",
    ...
  }
]
```

---

## Troubleshooting

### Problem 1: MongoDB Connection Error
**Error:**
```
Connection Error: MongooseServerSelectionError
```

**Solusi:**
1. Pastikan connection string benar
2. Cek username dan password MongoDB
3. Whitelist IP address di MongoDB Atlas
4. Pastikan internet connection aktif

### Problem 2: Port Already in Use
**Error:**
```
Port 3000 is already in use
```

**Solusi:**
1. Matikan aplikasi yang menggunakan port 3000
2. Atau ubah port di file `bin/www`:
   ```javascript
   var port = normalizePort(process.env.PORT || '3001');
   ```

### Problem 3: Module Not Found
**Error:**
```
Cannot find module 'express'
```

**Solusi:**
```bash
npm install
```

### Problem 4: Collection is Empty
**Solusi:**
1. Pastikan data sudah diinsert ke MongoDB
2. Cek nama collection (harus: `housings`)
3. Cek nama database (harus: `PAWII-SI`)

---

## Development Tips

### 1. Install Nodemon (sudah included)
Nodemon akan auto-restart server ketika ada perubahan code:
```bash
npm run dev
```

### 2. MongoDB Compass
Gunakan MongoDB Compass untuk visualisasi dan manage database dengan GUI.

### 3. VS Code Extensions Recommended
- **MongoDB for VS Code**: Manage MongoDB dari VS Code
- **REST Client**: Testing API tanpa Postman
- **ESLint**: Code linting
- **Prettier**: Code formatting

### 4. Environment Variables
Untuk production, gunakan environment variables:

Buat file `.env`:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/PAWII-SI
NODE_ENV=production
```

Install `dotenv`:
```bash
npm install dotenv
```

Update `app_server/models/db.js`:
```javascript
require('dotenv').config();
let dbURI = process.env.MONGODB_URI;
```

---

## Next Steps - Pengembangan Lebih Lanjut

### 1. Tambah CRUD Operations
Implementasikan operasi:
- **CREATE**: POST /housing
- **READ**: GET /housing/:id
- **UPDATE**: PUT /housing/:id
- **DELETE**: DELETE /housing/:id

### 2. Validation
Tambahkan validation dengan `express-validator`:
```bash
npm install express-validator
```

### 3. Authentication
Implementasi JWT untuk security:
```bash
npm install jsonwebtoken bcrypt
```

### 4. Pagination
Tambahkan pagination untuk GET all:
```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const housing = await Housing.find({}).skip(skip).limit(limit);
```

### 5. Search & Filter
Implementasi search berdasarkan city, state, dll:
```javascript
const { city, state } = req.query;
const filter = {};
if (city) filter.city = city;
if (state) filter.state = state;

const housing = await Housing.find(filter);
```

---

## Kontribusi

Untuk berkontribusi pada project ini:
1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## Referensi

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [EJS Documentation](https://ejs.co/)

---

## Lisensi

Project ini dibuat untuk keperluan pembelajaran mata kuliah Pemrograman Aplikasi Web II.

---

## Kontak & Support

Jika ada pertanyaan atau masalah, silakan:
- Buat issue di repository
- Hubungi dosen pengampu

---

**Happy Coding! 🚀**
