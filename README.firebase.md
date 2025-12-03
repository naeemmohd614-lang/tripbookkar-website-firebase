# Firebase App Hosting par Next.js App Deploy Karne Ke Steps

Namaste! Yeh guide aapko apne Next.js application ko Firebase App Hosting par deploy karne mein madad karegi. Kripya neeche diye gaye steps ko dhyan se follow karein.

**Firebase App Hosting ke baare mein:** App Hosting ek naya aur behtar tareeka hai Next.js jaise modern web apps ko Firebase par deploy karne ka. Yeh server-side rendering (SSR) ko support karta hai aur aapke app ko ek secure aur scalable environment mein chalata hai.

---

### Zaroori Taiyaari (Prerequisites)

Deployment se pehle, yeh sunishchit karein ki aapke local machine par yeh cheezein install hain:

1.  **Node.js:** Aapke system par Node.js (version 18 ya 20) install hona chahiye.
2.  **Firebase CLI:** Agar aapne abhi tak Firebase Command Line Interface (CLI) install nahi kiya hai, to apne terminal mein yeh command chalayein:
    ```bash
    npm install -g firebase-tools
    ```

---

### Step 1: Firebase Mein Login Karein

Apne terminal mein neeche di gayi command chalakar apne Google account se Firebase mein login karein:

```bash
firebase login
```

Yeh aapke browser mein ek authentication page kholega. Wahan login process poora karein.

---

### Step 2: Apne Project ko Firebase se Connect Karein

Ab, aapko apne local project ko Firebase project se connect karna hoga.

1.  Apne project ke root directory mein terminal kholein.
2.  Neeche di gayi command chalayein:
    ```bash
    firebase init apphosting
    ```
3.  Command aapse kuch sawaal puchegi:
    *   **Select a project:** Apne existing Firebase project ko chunein ya ek naya project banayein.
    *   **Select a backend source:** Apne project ka root folder chunein (usually, aap "Enter" daba sakte hain).
    *   **Backend name:** Apne backend ke liye ek naam dein (jaise, `tripbookkar-backend`).
    *   **Select a region:** Apne nazdeeki region ko chunein (jaise, `asia-south1`).

Yeh process poora hone par, aapke project mein `.firebaserc` file ban jayegi jo aapke project ki settings save karegi.

---

### Step 3: Service Account Environment Variable Set Karein (ZAROORI)

Aapka app server-side code (jaise `src/app/actions.ts` mein) mein Firebase Admin SDK ka istemaal karta hai. Deployment ke liye, App Hosting ko aapke `serviceAccountKey.json` file ka content ek environment variable ke roop mein chahiye.

Neeche di gayi command ko apne terminal mein chalayein. **Is command ko chalane se pehle, `serviceAccountKey.json` file aapke project ke root directory mein honi chahiye.**

```bash
firebase apphosting:backends:update --backend <YOUR_BACKEND_NAME> --update-env-vars=FIREBASE_SERVICE_ACCOUNT="$(cat serviceAccountKey.json)"
```

**DHAYAN DEIN:** `<YOUR_BACKEND_NAME>` ko Step 2 mein diye gaye backend naam se replace karein (jaise, `tripbookkar-backend`).

---

### Step 4: Apna App Deploy Karein

Ab aapka project deploy hone ke liye taiyaar hai. Apne terminal mein yeh command chalayein:

```bash
firebase apphosting:backends:deploy <YOUR_BACKEND_NAME> --source .
```

Wapas, `<YOUR_BACKEND_NAME>` ko apne backend ke naam se replace karein.

Yeh command aapke project ko build karegi aur saari zaroori files ko Firebase par deploy kar degi. Ismein kuch minutes lag sakte hain.

---

### Step 5: Website Check Karein

Deployment poora hone ke baad, terminal aapko aapki live website ka URL dega. Us URL ko browser mein kholein. Aapka application ab Firebase par live ho jaana chahiye!

Agar koi samasya aati hai, to aap `firebase apphosting:backends:logs <YOUR_BACKEND_NAME>` command se server ke logs check kar sakte hain.
