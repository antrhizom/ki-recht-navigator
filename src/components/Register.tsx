"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AKZENT, AKZENT_HELL, GEDAEMPFT, LINIE } from "@/components/ui";

const REGISTER = [
  { href: "/", nr: 1, titel: "Einstieg", kurz: "Einstieg" },
  { href: "/organisation", nr: 2, titel: "Organisation der Usecases", kurz: "Organisation" },
  { href: "/fragen", nr: 3, titel: "Fragen filtern", kurz: "Fragen" },
];

/** Kopfzeile mit den drei Registern; das Impressum steht rechts daneben. */
export default function Register() {
  const pfad = usePathname();
  return (
    <header
      className="sticky top-0 z-20 border-b bg-white"
      style={{ borderColor: LINIE }}
    >
      <div className="mx-auto max-w-[860px] px-4 pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[14px] font-semibold">
            KI-Recht Navigator
            <span className="font-normal" style={{ color: GEDAEMPFT }}>
              {" "}
              · DLH Digital Learning Hub
            </span>
          </p>
          <Link
            href="/impressum"
            aria-current={pfad === "/impressum" ? "page" : undefined}
            className="flex-none text-[14px] hover:underline"
            style={{
              color: pfad === "/impressum" ? AKZENT : GEDAEMPFT,
              fontWeight: pfad === "/impressum" ? 650 : 400,
            }}
          >
            Impressum
          </Link>
        </div>
        <nav
          aria-label="Register"
          className="-mb-px mt-2 flex gap-1 overflow-x-auto [scrollbar-width:none]"
        >
          {REGISTER.map((r) => {
            const aktiv = pfad === r.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={aktiv ? "page" : undefined}
                className="flex flex-none items-center gap-1.5 rounded-t-lg border border-b-0 px-2.5 py-2 text-[15px] sm:gap-2 sm:px-3"
                style={{
                  borderColor: aktiv ? LINIE : "transparent",
                  backgroundColor: aktiv ? "#fff" : undefined,
                  color: aktiv ? AKZENT : GEDAEMPFT,
                  fontWeight: aktiv ? 650 : 500,
                  boxShadow: aktiv ? "0 1px 0 #fff" : undefined,
                }}
              >
                <span
                  className="inline-grid h-[1.6em] w-[1.6em] place-items-center rounded-full text-[12.5px]"
                  style={{
                    backgroundColor: aktiv ? AKZENT : AKZENT_HELL,
                    color: aktiv ? "#fff" : AKZENT,
                  }}
                >
                  {r.nr}
                </span>
                <span className="hidden sm:inline">{r.titel}</span>
                <span className="sm:hidden">{r.kurz}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
