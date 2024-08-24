import { useEffect, useState } from "react";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import logo from './react.svg';

const Navbar = () => {
  return (
    <div className="flex h-96 w-full justify-start p-10 text-neutral-200 relative mb-0"
    style={{
      backgroundColor: "transparent",
    }}
    >
      <div className="absolute left-[10%]">
        <Logo />
      </div>

      <div className="flex-grow flex justify-center">
        <Tabs />
      </div>

      <div className="absolute flex right-[10%]">
        <User />
        <SignInButton />
      </div>
    </div>
  );
};

const SignInButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(isClicked);
  };

  return (
    <button onClick={handleClick}
    className=" flex flex-row-reverse items-center gap-1 px-2 ml-1 rounded-full border-2 text-white"
    style={{
      background: "black",
      borderImage: "linear-gradient(to right, #832232, #B497D6) 1",
    }}
    >
      <span>{isClicked ? "Fill" : "Sign In"}</span>
      <motion.div animate ={{
        x: isClicked ? 10 : 0,
        rotate : isClicked ? 90 : 0,
      }}
      transition = {{duration: 0.3}}
      className="flex items-center justify-center w-6 h-6 rounded-xl"
      style = {{
        background : "linear-gradient(to right, #832232, #B497D6",
      }}>
        <FiArrowRight className="text-white" />
      </motion.div>
    </button>
  );
};

const Tabs = () => {
    const [selected, setSelected] = useState(1);
    const [dir, setDir] = useState(null);

    const handleSetSelected = (val) => {
        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "1");
        } else if (val === null) {
            setDir(null);
        }
        setSelected(val);
    };

    return (
        <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-4"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
    );
};

const Tab = ({ children, tab, handleSetSelected, selected, isLink }) => {
  return isLink ? (
    <a
      href="#"
      className={`flex items-center gap-1 rounded-full px-4 py-2 text-[20px] transition-all transform ${
        selected === tab
          ? "text-white scale-105"
          : "hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-[#B497D6] hover:to-[#832232] hover:scale-110"
      }`}
      style={{
        WebkitBackgroundClip: selected === tab ? "inherit" : "text",
        backgroundClip: selected === tab ? "inherit" : "text",
        backgroundImage:
          selected === tab
            ? "none"
            : "linear-gradient(to right, #B497D6, #832232)",
        color: selected === tab ? "#fff" : "white", // Initial color white
      }}
    >
      <span>{children}</span>
    </a>
  ) : (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[20px] transition-all transform ${
        selected === tab
          ? "text-white scale-105"
          : "hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-[#B497D6] hover:to-[#832232] hover:scale-110"
      }`}
      style={{
        WebkitBackgroundClip: selected === tab ? "inherit" : "text",
        backgroundClip: selected === tab ? "inherit" : "text",
        backgroundImage:
          selected === tab
            ? "none"
            : "linear-gradient(to right, #B497D6, #832232)",
        color: selected === tab ? "#fff" : "white", // Initial color white
      }}
    >
      <span>{children}</span>
    </button>
  );
};



const Content = ({ selected, dir }) => {
    const currentTab = TABS.find((tab) => tab.id === selected);

    if (currentTab.isLink) return null;
    return (
      <motion.div
        id="overlay-content"
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 8,
        }}
        className="absolute left-0 top-[calc(100%_+_24px)] w-96 border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4 rounded-lg"
        style={{
          borderImage: 'linear-gradient(to right, #832232, #B497D6) 1 ',
        }}
      >
        <Bridge />
        <Nub selected={selected} />
  
        {TABS.map((t) => {
          return (
            <div className="overflow-hidden" key={t.id}>
              {selected === t.id && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <t.Component />
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>
    );
};

const Bridge = () => (
    <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
      moveNub();
    }, [selected]);

    const moveNub = () => {
      if (selected) {
        const hoveredTab = document.getElementById(`shift-tab-${selected}`);
        const overlayContent = document.getElementById("overlay-content");

        if (!hoveredTab || !overlayContent) return;

        const tabRect = hoveredTab.getBoundingClientRect();
        const { left: contentLeft } = overlayContent.getBoundingClientRect();

        const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

        setLeft(tabCenter);
      }
    };

    return (
      <motion.span
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        }}
        animate={{ left }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
      />
    );
};

const Logo = () => (
    <div>
      <a href="#">
        <img src={logo} alt="Logo" />
      </a>
    </div>
);

const User = () => (
    <div>
      <FaUserCircle className="h-10 w-10 text-neutral-200" />
    </div>
);

const Home = () => (
    <div>
      <a href="#"></a>
    </div>
);

const Services = () => (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <h3 className="mb-2 text-sm font-medium">Web Development</h3>
          <a href="#" className="block text-sm text-neutral-400">Frontend</a>
          <a href="#" className="block text-sm text-neutral-400">Backend</a>
          <a href="#" className="block text-sm text-neutral-400">Fullstack</a>
        </div>
        <div className="text-center">
          <h3 className="mb-2 text-sm font-medium">Game Development</h3>
          <a href="#" className="block text-sm text-neutral-400">Option1</a>
          <a href="#" className="block text-sm text-neutral-400">Option2</a>
          <a href="#" className="block text-sm text-neutral-400">Option3</a>
        </div>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>View more</span>
        <FiArrowRight />
      </button>
    </div>
);

const AssetStore = () => (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <h3 className="mb-2 text-sm font-medium">Web Assets</h3>
          <a href="#" className="block text-sm text-neutral-400">Option1</a>
          <a href="#" className="block text-sm text-neutral-400">Option2</a>
          <a href="#" className="block text-sm text-neutral-400">Option3</a>
        </div>
        <div className="text-center">
          <h3 className="mb-2 text-sm font-medium">Game Assets</h3>
          <a href="#" className="block text-sm text-neutral-400">Option1</a>
          <a href="#" className="block text-sm text-neutral-400">Option2</a>
          <a href="#" className="block text-sm text-neutral-400">Option3</a>
        </div>
      </div>
    </div>
);

const AboutUs = () => (
    <div>
      <a href="#"></a>
    </div>
);

const TABS = [
    {
      title: "Home",
      Component: Home,
      animate: false,
      isLink: true,
    },
    {
      title: "Services",
      Component: Services,
      isLink: false,
    },
    {
      title: "AssetStore",
      Component: AssetStore,
      isLink: false,
    },
    {
      title: "AboutUs",
      Component: AboutUs,
      animate: false,
      isLink: true,
    },
  ].map((n, idx) => ({ ...n, id: idx + 1 }));

export default Navbar;
