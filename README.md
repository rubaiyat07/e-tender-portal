# E-Tender Portal + Vendor Performance System  

![E-Tender Portal Screenshot](https://via.placeholder.com/1200x600?text=E-Tender+Portal+Dashboard)  
*Live Demo: [demo.etender-portal.com](https://demo.etender-portal.com)*  

A complete e-procurement solution with vendor performance analytics built with **React** (frontend) and **Core PHP** (backend).  

---

## ✨ Features  

### For Procurement Teams:  
✅ Publish and manage tenders with attachments  
✅ Evaluate vendors using customizable scoring criteria  
✅ Compare bids side-by-side  
✅ Performance dashboards with historical data  

### For Vendors:  
🛠️ Browse and apply to open tenders  
📈 View performance scores and improvement areas  
📁 Submit digital proposals with document uploads  
🔔 Real-time notifications  

### For Admins:  
👥 User and role management  
📊 Generate vendor performance reports  
⚖️ Blacklist underperforming vendors  
✉️ Send bulk notifications  

---

## 🛠️ Technologies Used  

**Frontend:**  
- React.js  
- Axios (API calls)  
- Bootstrap 5 
- Chart.js (Performance visualization)  

**Backend:**  
- Core PHP (Object-Oriented)  
- MySQL Database  
- JWT Authentication  
- RESTful APIs  

**Infrastructure:**  
🖥️ Apache  
🗄️ MySQL  

---

## 📦 Database Schema  
Key tables:  
- `tenders` - Tender listings  
- `vendor_applications` - Bid submissions  
- `vendor_scores` - Evaluation metrics  
- `performance_reviews` - Post-project ratings  
- `users` - Role-based accounts  

---

## 🚀 Installation  

```bash
# Clone repository
git clone https://github.com/rubaiyat07/e-tender-portal.git
cd e-tender-portal

# Backend setup
cp api/config.example.php api/config.php
# Configure database settings in config.php

# Frontend setup
cd frontend
npm install
npm start

📂 Project Structure
text
e-tender-portal/
├── api/                   # PHP Backend
│   ├── auth/              # JWT Authentication
│   ├── tenders/           # Tender CRUD APIs
│   ├── vendors/           # Vendor evaluation APIs
│   └── utils/             # Helpers & middleware
├── frontend/              # React Application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # UI Components
│       ├── pages/         # Application views
│       └── services/      # API services
├── database/              # SQL schemas
└── docs/                  # Technical documentation

🤝 Contributing
Fork the project

Create your branch: git checkout -b feature/NewFeature

Commit changes: git commit -m 'Add awesome feature'

Push: git push origin feature/NewFeature

Open a Pull Request


📜 License
MIT License - See LICENSE for details.

#DEMO