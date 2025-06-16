import Navbar from "../../components/Navbar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
        <p className="text-gray-600">Welcome to Druk Dragon Profile page!</p>

        <div className="mt-6 border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Name</h2>
              <p className="text-gray-600">Druk Dragon Team</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="text-gray-600">drukdragonteam05@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
