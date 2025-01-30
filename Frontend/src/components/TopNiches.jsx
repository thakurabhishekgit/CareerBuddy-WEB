import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "STEM",
      description:
        "Science, Technology, Engineering, Mathematics",
      url: "https://www.livescience.com/43296-what-is-stem-education.html",
    },
    {
      id: 2,
      service: "Commerce and Finance",
      description:
        "Insights into careers in accounting, finance, Business Manegment and  Entrepreneurship",
      url: "https://www.investopedia.com/terms/c/commerce.asp",
    },
    {
      id: 3,
      service: "Arts and Hummanities",
      description:
        "Careers in Literature, History, Psychology. Opportunities in Media, Journalism, Teaching, Law",
      url: "https://www.melioeducation.com/blog/introduction-to-arts-and-humanities/#:~:text=Put%20simply%2C%20Arts%20and%20Humanities,%2C%20history%2C%20language%20and%20culture.",
    },
    {
      id: 4,
      service: "Vocational and Skill-Based careers",
      description:
        "Hospitality, Tourism, Fasion Design, Culinary Arts and Diploma courses",
      url: "https://in.indeed.com/career-advice/career-development/vocational-training",
    },
    {
      id: 5,
      service: "Creative and Performing Arts",
      description:
        "Music, Dance, Filmmaking, Theater, Animation, Graphic design",
      url: "https://www.tidegloballearning.net/secondary/creative-and-performing-arts",
    },
    {
      id: 6,
      service: "Sports and Physical Education",
      description:
        "Careers in sports management, coaching, athletics and fitness training",
      url: "https://www.olympusacademy.org.uk/teaching-and-learning/sport-and-performing-arts/",
    },
  ];

  return (
    <>
      <style jsx>{`
        .top-niches-container {
          padding: 60px 20px;
          background-color: #f5f5f5;
          color: #333;
          text-align: center;
        }

        .top-niches-container h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 40px;
        }

        .niche-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .niche-card {
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 20px;
          max-width: 350px;
          flex: 1 1 300px;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none; /* Ensures the text itself is not underlined */
        }

        .niche-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }

        .niche-card h4 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .niche-card p {
          font-size: 1rem;
          color: #666;
        }
      `}</style>
      <section className="top-niches-container">
        <h3>Top Niches</h3>
        <div className="niche-grid">
          {services.map((element) => (
            <a
              className="niche-card"
              href={element.url}
              key={element.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>{element.service}</h4>
              <p>{element.description}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default TopNiches;