# Hostinger par Next.js App Deploy Karne Ke Steps

Namaste! Yeh guide aapko apne Next.js application ko Hostinger par deploy karne mein madad karegi. Kripya neeche diye gaye steps ko dhyan se follow karein.

**Next.js ke baare mein:** Aapka project Next.js se bana hai, jo ek full-stack framework hai. Iska matlab hai ki aapka frontend (jo users ko dikhta hai) aur backend (API, server logic) ek hi project mein hain. Neeche diye gaye steps aapke poore application ko ek saath deploy kar denge.

---

### Step 1: Apne Project ko Build Karein

Sabse pehle, aapko apne project ka production-ready version banana hoga. Iske liye, apne local machine ke terminal mein yeh command chalayein:

```bash
npm run build
```

Yeh command aapke project mein ek `.next` naam ka folder banayega. Is folder mein aapke application ke saare optimized files honge jo deployment ke liye zaroori hain.

---

### Step 2: Zaroori Files ko Compress (Zip) Karein

Ab, aapko deployment ke liye zaroori files aur folders ko ek zip file mein compress karna hoga. Aapko neeche di gayi cheezon ko zip karna hai:

1.  `.next` folder (jo Step 1 mein bana hai)
2.  `public` folder
3.  `node_modules` folder
4.  `package.json` file
5.  `package-lock.json` file
6.  `next.config.ts` file

**DHYAN DEIN:** `serviceAccountKey.json` file ko is zip mein **NAHI** daalna hai. Yeh ek surakshit (secure) tareeke se handle kiya jayega.

In sabhi ko select karke ek `.zip` file bana lein (jaise, `tripbookkar-deploy.zip`).

---

### Step 3: Hostinger hPanel mein Files Upload aur Extract Karein

1.  Apne Hostinger account mein login karein aur **hPanel** par jaayein.
2.  Apni website ke liye **Hosting** section mein jaayein aur **Manage** par click karein.
3.  **Files** section mein **File Manager** par click karein.
4.  File Manager khulne par, `public_html` folder mein jaayein (us par double-click karein).
5.  Upar-right corner mein **Upload Files** icon par click karein aur apni banayi hui `.zip` file ko select karke upload karein.
6.  Upload hone ke baad, `.zip` file par right-click karein aur **Extract** ka option chunein. Files ko `public_html` folder mein hi extract karein.

---

### Step 4: Hostinger par Node.js App Set up Karein

Yeh sabse zaroori hissa hai.

1.  Apne hPanel dashboard par wapas jaayein.
2.  **Advanced** section tak scroll karein aur **"Setup Node.js App"** par click karein.
3.  **"Create Application"** button par click karein.
4.  Ek form khulega. Usmein neeche di gayi jaankari bharein:
    *   **Node.js version:** Apne project ke anusaar `18.x` ya `20.x` chunein.
    *   **Application mode:** `Production` select karein.
    *   **Application root:** `public_html` hona chahiye (jahan aapne files extract ki hain).
    *   **Application startup file:** Ismein yeh likhein -> `node_modules/.bin/next`
5.  **"Create"** par click karein.

---

### Step 5: Environment Variable Set Karein (SURAKSHA KE LIYE ZAROORI)

Application create hone ke baad, usi page par neeche aapko **"Environment variables"** ka section dikhega.

1.  **"Add Variable"** par click karein.
2.  Ek form khulega:
    *   **Name:** Ismein `FIREBASE_SERVICE_ACCOUNT` likhein.
    *   **Value:** Yahan par aapko apne `serviceAccountKey.json` file ka poora content copy karke paste karna hai. File ko text editor mein kholein, sab kuch (Ctrl+A ya Cmd+A) select karein, copy karein, aur is box mein paste kar dein.
3.  **"Add"** par click karein.

---

### Step 6: Packages Install aur App Start Karein

Ab, Node.js App setup page par wapas upar jaayein:

1.  **"Run NPM Install"** button par click karna hai. Isse aapke project ke zaroori server packages install honge. Ismein thoda samay lag sakta hai.
2.  Jab packages install ho jaayein, to **"Start App"** button par click karein.

---

### Step 7: Website Check Karein

Thodi der intezaar karne ke baad, apni website ko browser mein kholein. Aapka application ab live ho jaana chahiye aur database se sahi tarah se connect hona chahiye!

Agar koi samasya aati hai, to aap Hostinger ke support se bhi sampark kar sakte hain.
