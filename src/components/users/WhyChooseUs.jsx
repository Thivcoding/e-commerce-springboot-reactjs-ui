import {
  FaShippingFast,
  FaLock,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";

const features = [
  {
    title: "Fast Delivery",
    description: "Quick and reliable shipping worldwide.",
    icon: <FaShippingFast />,
  },
  {
    title: "Secure Payment",
    description: "100% safe and encrypted payment system.",
    icon: <FaLock />,
  },
  {
    title: "24/7 Support",
    description: "Friendly customer support anytime.",
    icon: <FaHeadset />,
  },
  {
    title: "Easy Returns",
    description: "Simple and hassle-free return policy.",
    icon: <FaUndo />,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border border-slate-100 bg-slate-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl text-indigo-600">
            {item.icon}
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WhyChooseUs;