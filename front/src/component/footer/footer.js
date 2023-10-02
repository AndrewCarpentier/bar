import { Link } from "react-router-dom";

export function Footer() {
  const footerNavs = [
    {
      href: "/contact",
      name: "Contact",
    },
    {
      href: "/privacyPolicy",
      name: "Privacy",
    },
    {
      href: "javascript:void()",
      name: "About us",
    },
  ];

  return (
    <footer className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
        <p>© 2023 C'estpasbien. All rights reserved.</p>
        <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
          {footerNavs.map((item, idx) => (
            <li className="text-gray-800 hover:text-gray-500 duration-150">
              <Link to={item.href} key={idx}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
