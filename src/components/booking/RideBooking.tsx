// src/components/booking/RideBooking.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Car,
  Navigation,
  Users,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

type BookingStep =
  | "destination"
  | "map"
  | "vehicle"
  | "carDetails"
  | "payment"
  | "confirmation"
  | "success";

interface BookingData {
  from: string;
  to: string;
  vehicleType: string;
  scheduledTime: string;
  paymentMethod: string;
  notes: string;
  withDriver?: boolean;
}

const carOptions = [
  {
    id: "sedan-4",
    name: "Toyota Camry",
    year: "2023",
    type: "Petrol",
    seaters: 4,
    category: "Sedan",
    icon: "🚗",
  },
  {
    id: "suv-5",
    name: "Honda CR-V",
    year: "2023",
    type: "Petrol",
    seaters: 5,
    category: "SUV",
    icon: "🚙",
  },
  {
    id: "suv-6",
    name: "Toyota Innova",
    year: "2022",
    type: "Diesel",
    seaters: 6,
    category: "SUV",
    icon: "🚐",
  },
  {
    id: "suv-7",
    name: "Mahindra XUV700",
    year: "2023",
    type: "Petrol",
    seaters: 7,
    category: "SUV",
    icon: "🚙",
  },
  {
    id: "electric-5",
    name: "Tesla Model 3",
    year: "2023",
    type: "Electric",
    seaters: 5,
    category: "Sedan",
    icon: "⚡",
  },
];

export const RideBooking: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // ✅ All hooks at top level (fixed)
  const [currentStep, setCurrentStep] = useState<BookingStep>("destination");
  const [bookingData, setBookingData] = useState<BookingData>({
    from: "Current Location",
    to: "",
    vehicleType: "",
    scheduledTime: "",
    paymentMethod: "",
    notes: "",
    withDriver: true,
  });
  const [loading, setLoading] = useState(false);

  // moved from inside 'carDetails' step
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [withDriver, setWithDriver] = useState<boolean>(true);

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingData.to.trim()) setCurrentStep("map");
  };

  const handleVehicleSelect = (vehicleType: string) => {
    setBookingData((prev) => ({ ...prev, vehicleType }));
    setCurrentStep("carDetails"); // navigate to details
  };

  const handleBooking = async (paymentMethod: string) => {
    setBookingData((prev) => ({ ...prev, paymentMethod }));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep("confirmation");
      setTimeout(() => {
        setCurrentStep("destination");
        setBookingData({
          from: "Current Location",
          to: "",
          vehicleType: "",
          scheduledTime: "",
          paymentMethod: "",
          notes: "",
        });
        setSelectedCar("");
        setWithDriver(true);
      }, 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const goBack = () => {
    switch (currentStep) {
      case "map":
        setCurrentStep("destination");
        break;
      case "vehicle":
        setCurrentStep("map");
        break;
      case "carDetails":
        setCurrentStep("vehicle");
        break;
      case "payment":
        setCurrentStep("carDetails");
        break;
      default:
        setCurrentStep("destination");
    }
  };

  // ---- destination ----
  if (currentStep === "destination") {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-secondary-900">Where to?</h1>
            <p className="text-secondary-600">
              Enter your destination to get started
            </p>
          </div>
          <Card className="p-6">
            <form onSubmit={handleDestinationSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-secondary-700 font-medium">
                    Current Location
                  </span>
                </div>
                <Input
                  label="Destination"
                  name="to"
                  value={bookingData.to}
                  onChange={handleChange}
                  placeholder="Where do you want to go?"
                  required
                  className="text-lg"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Navigation className="w-5 h-5 mr-2" /> Continue
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ---- map ----
  if (currentStep === "map") {
    return (
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <div className="bg-white shadow-sm p-4 flex items-center space-x-3">
          <button
            onClick={goBack}
            className="p-2 hover:bg-secondary-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="text-sm text-secondary-600">
              From: Current Location
            </div>
            <div className="font-medium text-secondary-900">
              To: {bookingData.to}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-b from-green-100 to-blue-100 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-red-500" />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <p className="font-medium text-secondary-900">Route Preview</p>
                <p className="text-sm text-secondary-600">Distance: ~8.5 km</p>
                <p className="text-sm text-secondary-600">Duration: ~15 mins</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
        </div>

        <div className="bg-white p-4 space-y-3 shadow-lg">
          <Button
            onClick={() => setCurrentStep("vehicle")}
            className="w-full"
            size="lg"
          >
            <Car className="w-5 h-5 mr-2" /> Book Now
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Book for Others</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Ride</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---- vehicle ----
  if (currentStep === "vehicle") {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={goBack}
              className="p-2 hover:bg-secondary-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">
                Choose Vehicle
              </h1>
              <p className="text-sm text-secondary-600">
                Select your preferred ride
              </p>
            </div>
          </div>

          <Card
            hover
            className="p-6 border-2 hover:border-primary-300"
            onClick={() => handleVehicleSelect("car")}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🚗</div>
              <div>
                <h3 className="font-semibold text-lg text-secondary-900">
                  Car Type
                </h3>
                <p className="text-sm text-secondary-600">
                  Choose your preferred car
                </p>
              </div>
              <div className="ml-auto text-2xl text-secondary-400">→</div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ---- carDetails ----
  if (currentStep === "carDetails") {
    const handleCarSelection = () => {
      if (!selectedCar) return;
      setBookingData((prev) => ({
        ...prev,
        vehicleType: selectedCar,
        withDriver,
      }));
      setCurrentStep("success");
    };

    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={goBack}
              className="p-2 hover:bg-secondary-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">
                Select Car
              </h1>
              <p className="text-sm text-secondary-600">
                Choose your preferred vehicle
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {carOptions.map((car) => (
              <Card
                key={car.id}
                hover
                className={`p-4 border-2 transition-colors ${
                  selectedCar === car.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-secondary-200 hover:border-primary-300"
                }`}
                onClick={() => setSelectedCar(car.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{car.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900">
                        {car.name}
                      </h3>
                      <p className="text-sm text-secondary-600">
                        {car.category} • {car.year}
                      </p>
                    </div>
                    {selectedCar === car.id && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-secondary-100 rounded-lg p-2 text-center">
                      <p className="font-medium text-secondary-900">
                        {car.seaters} Seaters
                      </p>
                    </div>
                    <div className="bg-secondary-100 rounded-lg p-2 text-center">
                      <p className="font-medium text-secondary-900">
                        {car.type}
                      </p>
                    </div>
                    <div className="bg-secondary-100 rounded-lg p-2 text-center">
                      <p className="font-medium text-secondary-900">
                        {car.year}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4">
            <h3 className="font-semibold text-secondary-900 mb-3">
              Driver Option
            </h3>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={withDriver}
                onChange={(e) => setWithDriver(e.target.checked)}
                className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
              />
              <div>
                <p className="font-medium text-secondary-900">With Driver</p>
                <p className="text-sm text-secondary-600">
                  Professional driver included
                </p>
              </div>
            </label>

            {!withDriver && (
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Valid driving license required for
                  self-drive option
                </p>
              </div>
            )}
          </Card>

          <Button
            onClick={handleCarSelection}
            disabled={!selectedCar}
            className="w-full"
            size="lg"
          >
            Confirm Selection
          </Button>
        </motion.div>
      </div>
    );
  }

  // ---- success ----
  if (currentStep === "success") {
    return (
      <div className="max-w-md mx-auto px-4 py-6 h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            scale: { type: "spring", damping: 10, stiffness: 100 },
          }}
          className="text-center space-y-6 relative"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              damping: 8,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0.4)",
                  "0 0 0 20px rgba(34, 197, 94, 0)",
                  "0 0 0 0 rgba(34, 197, 94, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-white text-4xl"
              >
                ✓
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Car Booked Successfully!
            </h1>
            <p className="text-secondary-600">Your ride has been confirmed</p>
          </motion.div>

          <Card className="p-6 text-left bg-gradient-to-r from-primary-50 to-yellow-50">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Route:</span>
                <span className="font-medium text-secondary-900">
                  Current → {bookingData.to}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Vehicle:</span>
                <span className="font-medium text-secondary-900">
                  {bookingData.vehicleType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Driver:</span>
                <span className="font-medium text-secondary-900">
                  {withDriver ? "With Driver" : "Self Drive"}
                </span>
              </div>
            </div>
          </Card>

          {/* confetti dots */}
        </motion.div>
      </div>
    );
  }

  // ---- payment (unchanged) ----
  if (currentStep === "payment") {
    const paymentMethods = [
      {
        value: "cash",
        label: "Cash",
        icon: "💵",
        description: "Pay with cash",
      },
      {
        value: "card",
        label: "Credit/Debit Card",
        icon: "💳",
        description: "Pay with card",
      },
      { value: "upi", label: "UPI", icon: "📱", description: "Pay with UPI" },
    ];
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={goBack}
              className="p-2 hover:bg-secondary-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">
                Payment Method
              </h1>
              <p className="text-sm text-secondary-600">
                How would you like to pay?
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((m) => (
              <Card
                key={m.value}
                hover
                className="p-4 border-2 hover:border-primary-300"
                onClick={() => handleBooking(m.value)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{m.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900">
                      {m.label}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {m.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};
