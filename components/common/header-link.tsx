import Link from "next/link";

export const HeaderLink = ({
  link,
}: {
  link: { name: string; href: string; active: boolean };
}) => {
  return (
    <Link
      key={link.name}
      href={link.href}
      className={`transition px-2 py-1 rounded ${
        link.active
          ? "text-primary hover:text-primary/80"
          : "hover:bg-primary/30 hover:text-primary"
      }`}
    >
      {link.name}
    </Link>
  );
};
