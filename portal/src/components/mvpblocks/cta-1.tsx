import { Github, Globe, Mail, Phone, Users } from 'lucide-react';
import Link from 'next/link';

export default function CTA1() {
  return (
    <div className="w-full">
      <section className="mx-auto px-4 py-3 lg:px-8 lg:py-8">
        <div
          className="relative isolate w-full overflow-hidden rounded-2xl"
          style={{
            background:
              'linear-gradient(100.5deg,rgba(57,18,241,.4) 29.55%,rgba(164,129,255,.4) 93.8%),radial-gradient(38.35% 93.72% at 18.31% 6.28%,rgba(170,135,252,.8) 0,rgba(61,27,205,.8) 100%)',
          }}
        >
          <div className="relative isolate overflow-hidden px-4 py-12 sm:px-24">
            <p className="w-fit rounded-xl bg-white px-4 py-1 text-center text-base leading-7 font-semibold text-black uppercase lg:text-left">
              SIH 2K25
            </p>
            <h2 className="mt-3 max-w-md text-4xl font-semibold text-white md:text-6xl">
              Tour Guard
            </h2>
            <p className="my-auto mt-3 max-w-2xl text-base text-gray-300 md:text-lg">
              Promoting Travel, Protecting Every Journey.
            </p>
            <div className="mt-8 flex w-full flex-col justify-between gap-4 text-lg md:flex-row">
              <a
                className="flex items-center gap-2 text-white"
                href="https://abheeee.vercel.app"
              >
                <Users className="h-7 w-7" />
                Team Undefined
              </a>
              <a className="flex items-center gap-2 text-white" href="#">
                <Github className="h-7 w-7 text-green-500" />
                Visit
              </a>
              <Link
                prefetch={false}
                className="flex items-center gap-2 text-white"
                href="https://github.com/abheeee03/sih"
              >
                <Globe className="h-7 w-7 text-blue-500" />
                Demo Video
              </Link>
            </div>
            <ul className="mt-8 ml-4 list-disc text-sm text-gray-300 md:text-base">
              <li>Making Tourism Safer, Smarter, Stronger.</li>
              <li>
               Travel Without Fear, Powered by AI & Blockchain
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
