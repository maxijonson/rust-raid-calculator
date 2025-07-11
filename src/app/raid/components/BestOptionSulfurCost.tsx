import React from "react";
import Image from "next/image";
import { CollectionItem } from "../types";

interface BestOptionSulfurCostProps {
  collection: CollectionItem[];
  calculateCost: (option: string, quantity: number) => number;
}

const BestOptionSulfurCost: React.FC<BestOptionSulfurCostProps> = ({
  collection,
  calculateCost,
}) => {
  const totalQuantity = collection.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  if (totalQuantity === 0) {
    return null;
  }

  const options = [
    { id: "c4", image: "/images/tools/c4.png" },
    { id: "bullets", image: "/images/ammunition/ammo.rifle.explosive.png" },
    { id: "rockets", image: "/images/ammunition/rockets.png" },
    { id: "satchel", image: "/images/tools/satchel.png" },
  ];
  const optionCosts = options.reduce((acc, option) => {
    const totalCost = collection.reduce((total, c) => {
      const optionValue =
        c.item.bestOption?.[option.id as keyof typeof c.item.bestOption] || 0;
      return total + calculateCost(option.id, optionValue * c.quantity);
    }, 0);
    if (totalCost > 0) {
      acc[option.id] = { total: totalCost, option };
    }
    return acc;
  }, {} as Record<string, { total: number; option: { image: string } }>);

  if (Object.keys(optionCosts).length === 0) {
    return null;
  }

  return (
    <div className="p-4 py-8">
      <h2 className="text-xl font-bold ml-6 mb-4">Best Option Sulfur Cost</h2>
      <div className="flex ml-6">
        {Object.entries(optionCosts).map(([option, { total, option: { image } }]) => (
          <div key={option} className="flex items-center mr-4">
            <div style={{ position: "relative" }}>
              <Image
                src={image}
                height={50}
                width={50}
                alt={option.toUpperCase()}
              />
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#DDD71B",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                <p className="opacity-100">{total}</p>
                <div className="flex flex-col w-20 h-20 absolute top-0 left-0">
                  <Image
                    src="/images/resources/sulfur.png"
                    height={15}
                    width={15}
                    alt="Sulfur"
                    className="brightness-100"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestOptionSulfurCost;
