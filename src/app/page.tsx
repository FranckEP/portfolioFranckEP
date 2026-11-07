import Image from "next/image";
import LiveGitHub from "../components/LiveGitHub";
import Impact from "../components/Impact";
import QueryConsole from "../components/QueryConsole";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Credentials from "../components/Credentials";
import Contact from "../components/Contact";
import { links } from "../data/content";

function Nav() {
  return (
    <header className="frame relative z-10 flex items-center justify-between gap-6 py-5">
      <a href="#top" className="text-lg font-bold tracking-tight">
        Franck E. Peñaloza
      </a>
      <nav aria-label="Sections" className="flex items-center gap-6 md:gap-8">
        <a href="#work" className="hidden font-medium hover:text-accent md:inline">Work</a>
        <a href="#experience" className="hidden font-medium hover:text-accent md:inline">Experience</a>
        <a href="#contact" className="font-medium hover:text-accent">Contact</a>
        <a href={links.cv} download className="btn !px-4 !py-3 text-[0.9375rem]">
          CV <span aria-hidden>↓</span>
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="frame grid grid-cols-1 items-center gap-x-12 gap-y-14 pb-[clamp(64px,8vw,120px)] pt-8 md:pt-14 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12"
    >
      <div className="flex flex-col lg:col-span-7" data-stagger>
        <h1 className="display reveal text-[clamp(3.6rem,11vw,10.5rem)]">
          Franck E.
          <br />
          Peñaloza
        </h1>

        {/* The portrait shares edges with the text block: its top meets the intro's first line,
            its bottom meets the buttons' baseline. Width ≈ a quarter of the column, 4:5 portrait. */}
        <div className="reveal mt-10 grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-[auto_1fr] lg:mt-12">
          <div className="relative aspect-[4/5] w-[min(52vw,200px)] overflow-hidden bg-ground-2 sm:h-[220px] sm:w-[176px] lg:h-[250px] lg:w-[200px]">
            <Image
              src="/picture.png"
              alt="Portrait of Franck Echeverría Peñaloza"
              fill
              priority
              sizes="200px"
              className="object-cover object-[50%_22%]"
            />
          </div>
          <div className="flex max-w-[34rem] flex-col justify-between gap-8">
            <p className="text-[1.25rem] leading-[1.4] md:text-[1.5rem] md:leading-[1.35]">
              Data engineer and BI analyst. I turn scattered data into platforms the business
              trusts to decide.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#work" className="btn">
                See the work <span className="arrow" aria-hidden>→</span>
              </a>
              <a href={links.cv} download className="link">
                Download CV (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="reveal lg:col-span-5">
        <QueryConsole />
        <p className="note mt-3 text-ink-soft">
          Query me: pick a file and the console runs it. Now at OMBIA · Systems Engineer, with
          merit · <a href="#research" className="underline underline-offset-2 hover:text-accent">published in Elsevier</a>
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Impact />
        <LiveGitHub />
        <Projects />
        <Experience />
        <Credentials />
      </main>
      <Contact />
    </>
  );
}
