import React from 'react';

const Cards = () => {
  const cardData = [
    {
      image: '/Images/game-controller@2x.png',
      heading: 'Game Development',
      paragraph: 'We create immersive games that captivate players. Our talented team excels in various genres and platforms, turning concepts into reality. Collaborate with us to launch your next game.',
    },
    {
      image: '/Images/browser-settings@2x.png',
      heading: 'Web Development',
      paragraph: 'We turn your digital vision into reality with custom web development. Our team uses cutting-edge technology and creative design to build responsive, user-friendly websites tailored to your business.',
    },
    {
      image: '/Images/new-store@2x.png',
      heading: 'Asset Store',
      paragraph: 'Discover our collection of high-quality assets for game and web development.',
    },
  ];

  return (
    <div className="flex flex-row justify-center items-start gap-6 p-4 " style={{ marginTop: '-18%' }}>
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-black text-white border-[2px] border-gradient-to-r from-[#832232] to-[#B497D6] rounded-[10px] p-4 max-w-xs relative"
          style={{ width: '356px', height: '502px', fontFamily: 'Calibri' }}
        >
          <img
            src={card.image}
            alt={card.heading}
            className="w-[200px] h-[200px] rounded-t-lg object-cover mx-auto p-[10px]"
          />
          <h2 className="mt-10 mb-5 text-2xl font-bold text-center">{card.heading}</h2>
          <p className="mt-2 text-center" style={{ fontSize: '12px', color: '#DCDCDC' }}>
            {card.paragraph}
          </p>
          {index === 2 && (
            <div className="flex flex-row justify-center items-center mt-4 gap-20">
              <div className="flex flex-col items-center">
                <img
                  src="/Images/playstation-buttons@2x.png"
                  alt="Asset 1"
                  className="w-[30px] h-[30px]"
                />
                <span style={{ fontSize: '10px', color: '#DCDCDC' }}>Game Development</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/Images/source-code@2x.png"
                  alt="Asset 2"
                  className="w-[30px] h-[30px]"
                />
                <span style={{ fontSize: '10px', color: '#DCDCDC' }}>Web Development</span>
              </div>
            </div>
          )}
          <button
            className="mt-auto bg-black text-white border-[1px] border-gradient-to-r from-[#832232] to-[#B497D6] rounded-[30px] p-[4px] w-[100px] h-[40px] text-[12px] hover:bg-white hover:text-black"
            style={{ position: 'absolute', bottom: '30px', right: '30px' }}
          >
            Learn More
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cards;
