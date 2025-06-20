const Cuisine = require("../src/models/cuisine.model");
const connectMongoDB = require("../src/db/mongo.db");

const seedCuisine = async () => {
  await connectMongoDB();

  await Cuisine.create([
    {
      name: "Nepalese Cuisine",
      key: "Nepal",
      imgSrc:
        "https://th.bing.com/th/id/OIP.pd-gmXaFHnqeOLAe9EaGyQHaES?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
      desc: "Rich flavors of spices, momos, dal bhat, and hearty mountain food.",
    },
    {
      name: "Bhutanese Cuisine",
      key: "Bhutan",
      imgSrc: "https://images.slurrp.com/prod/rich_article/u122yjpw7or.webp",
      desc: "Unique dishes with chili, cheese, and locally sourced ingredients.",
    },
    {
      name: "Indian Cuisine",
      key: "Indian",
      imgSrc:
        "https://th.bing.com/th/id/OIP.jG8sjAg6Y1k8TH_K_DmcnQHaD4?r=0&w=1200&h=630&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
      desc: "Spicy, flavorful dishes like butter chicken, biryani, and masala dosa.",
    },
    {
      name: "Chinese Cuisine",
      key: "Chinese",
      imgSrc:
        "https://voicesfromthekitchen.org/wp-content/uploads/2021/10/Chinese-Cuisine-1.jpg",
      desc: "Diverse dishes like dumplings, fried rice, noodles, and stir-fries.",
    },
    {
      name: "Mexican Cuisine",
      key: "Mexican",
      imgSrc:
        "https://img.freepik.com/premium-photo/delicious-mexican-tacos-bold-flavors-vibrant-colors-ai-generative_841543-1691.jpg?w=1060",
      desc: "Bold flavors with tacos, enchiladas, guacamole, and more.",
    },
  ]);

  console.log("Cuisines seeded successfully");
};

seedCuisine();
