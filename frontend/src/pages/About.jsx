import { Link } from "react-router-dom";
import Tashi from "../assets/team/profile.jpeg";
import Sonam from "../assets/team/sonam.jpeg";
import Sangay from "../assets/team/sangay.jpeg";
import Norbu from "../assets/team/norbu.jpeg";
import Nav from "../components/AboutNav";

const About = () => {
  const styles = {
    logoutButton: {
      color: "white",
      textDecoration: "none",
      fontWeight: "600",
      border: "2px solid white",
      padding: "6px 15px",
      borderRadius: "25px",
      transition: "background-color 0.3s ease",
    },
    logoutButtonHover: {
      backgroundColor: "white",
      color: "#ff7043",
    },
    aboutContainer: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "1rem 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
      lineHeight: "1.6",
    },
    teamSection: {
      marginTop: "50px",
      textAlign: "center",
    },
    teamMembers: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "40px",
      marginTop: "30px",
    },
    teamMember: {
      width: "220px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "15px",
      padding: "20px",
      backgroundColor: "#fff",
      transition: "transform 0.3s ease",
    },
    teamMemberHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
    },
    teamImg: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "15px",
      border: "4px solidrgb(67, 255, 211)",
    },
    linksContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "15px",
    },
    link: {
      color: "#ff7043",
      textDecoration: "none",
      fontWeight: "600",
      border: "1.5px solidrgb(67, 255, 221)",
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    linkHover: {
      backgroundColor: "#ff7043",
      color: "white",
    },
    name: {
      margin: "10px 0 5px",
      fontSize: "1.2rem",
      color: "#222",
    },
    role: {
      fontStyle: "italic",
      color: "#666",
      fontSize: "0.95rem",
    },
  };

  return (
    <div>
      <>
        <Nav />
      </>
      <div style={styles.aboutContainer}>
        <div
          style={{
            backgroundColor: "#fff8f0",
            padding: "25px 30px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(230, 126, 34, 0.15)",
            color: "#4a4a4a",
            lineHeight: "1.6",
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 30px auto",
            border: "2px solid rgba(230, 126, 34, 0.4)",
            fontSize: "1rem",
          }}
        >
          <h1>About Druk Food Recipe</h1>
          <p>
            Druk Food Recipe is your go-to platform for exploring authentic
            Bhutanese cuisine. Our goal is to preserve and share traditional
            recipes passed down through generations, while also embracing modern
            culinary twists.
          </p>
          <p>
            Whether you're a seasoned cook or just getting started, our curated
            recipes, tips, and community support will help you on your culinary
            journey. Our team loves bonding over good food — exploring local
            flavors, new cuisines, and hidden gems together. And Nothing brings
            us closer than shared laughter and shared plates — food adventures
            are our team tradition!!!
          </p>
        </div>
        <div style={styles.teamSection}>
          <h2>Meet Our Team</h2>
          <div style={styles.teamMembers}>
            <div style={styles.teamMember}>
              <img src={Sonam} alt="Sonam Lhendup" style={styles.teamImg} />
              <div style={styles.linksContainer}>
                <a
                  href="https://github.com/slhendup"
                  style={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a href="mailto:sonamlhendupjr@gmail.com" style={styles.link}>
                  Email
                </a>
              </div>
              <h3 style={styles.name}>Sonam Lhendup</h3>
              <p style={styles.role}>Frontend Developer</p>
            </div>

            <div style={styles.teamMember}>
              <img src={Tashi} alt="Tashi Yuden" style={styles.teamImg} />
              <div style={styles.linksContainer}>
                <a
                  href="https://github.com/ttyuedenn"
                  style={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a href="mailto:tashiyuden07@gmail.com" style={styles.link}>
                  Email
                </a>
              </div>
              <h3 style={styles.name}>Tashi Yuden</h3>
              <p style={styles.role}>Backend Developer</p>
            </div>

            <div style={styles.teamMember}>
              <img src={Sangay} alt="Sangay Wangmo" style={styles.teamImg} />
              <div style={styles.linksContainer}>
                <a
                  href="https://github.com/sangay-wangmo"
                  style={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a href="mailto:wangmo30sangay@gmail.com" style={styles.link}>
                  Email
                </a>
              </div>
              <h3 style={styles.name}>Sangay Wangmo</h3>
              <p style={styles.role}>CSS Designer</p>
            </div>

            <div style={styles.teamMember}>
              <img src={Norbu} alt="Norbu Lhaden" style={styles.teamImg} />
              <div style={styles.linksContainer}>
                <a
                  href="https://github.com/Lhaden123"
                  style={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a href="mailto:norbul096@gmail.com" style={styles.link}>
                  Email
                </a>
              </div>
              <h3 style={styles.name}>Norbu Lhaden</h3>
              <p style={styles.role}>UI/UX Designer</p>
            </div>
          </div>
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <h2>Join Our Food Adventure!</h2>
            <p>
              Sign up to get exclusive recipes, tips, and community updates.
            </p>
            <Link
              to="/register"
              style={{
                backgroundColor: "#ff7043",
                color: "white",
                padding: "10px 20px",
                borderRadius: "25px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
