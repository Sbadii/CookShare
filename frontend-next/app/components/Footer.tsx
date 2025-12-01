// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-black text-white text-center py-6 mt-16">
      <p>© {new Date().getFullYear()} CookShare. All rights reserved.</p>
    </footer>
  );
}
