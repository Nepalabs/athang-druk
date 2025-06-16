const Home = () => {
  return (
    <div
      style={{ fontFamily: "'Segoe UI', sans-serif", margin: 0, padding: 0 }}
    >
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url('https://www.eliteplusmagazine.com/assets/ckeditor_fileupload/uploads/Bhutan%20food11_923832216.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "60px 40px",
            borderRadius: "12px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Welcome to Druk Dragon Team!
          </h1>
          <p style={{ fontSize: "1.5rem", lineHeight: "1.6" }}>
            Our team loves bonding over good food — exploring local flavors, new
            cuisines, and hidden gems together. And Nothing brings us closer
            than shared laughter and shared plates — food adventures are our
            team tradition!!!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
