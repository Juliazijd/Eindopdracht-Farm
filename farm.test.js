const { getYieldForPlant, 
        getYieldForCrop, 
        getTotalYield, 
        getCostForPlant,
        getCostForCrop,
        getRevenueForCrop,
        getProfitForCrop,
        getTotalProfit
} = require("./farm");

const corn = {
    name: "corn",
    yield: 3,
    cost: 1.5,
    salePrice: 2.5,
    factors: {
        sun: {
          low: -40,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          heavy: -60,
        }
      },
};
const pumpkin = {
    name: "pumpkin",
    yield: 4,
    cost: 2,
    salePrice: 3.5,
    factors: {
        sun: {
            low: 0.8,
            medium: 0,
            high: 1.5,
            },
        wind: {
            low: 0,
            medium: 0.7,
            heavy: 0.4,
            }
      },
};

const input = {
    crop: corn,
    numCrops: 10,
};

const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
];

const noEnvFactors = {
  sun: "medium",
  wind: "low"
};
const envFactors1 = {
    sun: "high",
    wind: "medium"
  };
const envFactors2 = {
    sun: "low",
    wind: "heavy"
  };
const envFactors3 = {
    sun: "medium",
    wind: "heavy"
  };
const envFactors4 = {
    sun: "high",
    wind: "low"
  };
  

describe("getYieldForPlant", () => {
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(input, noEnvFactors)).toBe(3);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop with no evironment factors", () => {
        expect(getYieldForCrop(input, noEnvFactors)).toBe(30);
    });
    test("Get yield for crop with high sun and medium wind", () => {
        expect(getYieldForCrop(input, envFactors1)).toBe(31.5);
    });
    test("Get yield for crop with medium sun and heavy wind", () => {
        expect(getYieldForCrop(input, envFactors3)).toBe(12);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        expect(getTotalYield({ crops }, noEnvFactors)).toBe(23);
    });
    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({crops}, noEnvFactors)).toBe(0);
    });
    test("Calculate total yield with multiple crops with low sun and heavy wind", () => {
        expect(getTotalYield({ crops }, envFactors2)).toBe(11.6);
    });
    test("Calculate total yield with multiple crops with high sun and low wind", () => {
        expect(getTotalYield({ crops }, envFactors4)).toBe(30.58);
    });
});

describe("getCostForPlant", () => {
    test("Calculate cost for plant, simple", () => {
        expect(getCostForPlant(corn)).toBe(1.5);
    });
});

describe("getCostForCrop", () => {
    test("Calculate cost for crop", () => {
        expect(getCostForCrop(input)).toBe(15);
    });
});

describe("getRevenueForCrop", () => {
    test("Calculate revenue for crop without environment factors", () => {
        expect(getRevenueForCrop(input, noEnvFactors)).toBe(75);
    });
    test("Calculate revenue for crop with high sun and medium wind", () => {
        expect(getRevenueForCrop(input, envFactors1)).toBe(78.75);
    });
    test("Calculate revenue for crop with low sun and heavy wind", () => {
        expect(getRevenueForCrop(input, envFactors2)).toBe(18);
    });
});

describe("getProfitForCrop", () => {
    test("Calculate profit for crop without environment factors", () => {
        expect(getProfitForCrop(input, noEnvFactors)).toBe(60);
    });
    test("Calculate profit for crop with medium sun and heavy wind", () => {
        expect(getProfitForCrop(input, envFactors3)).toBe(15);
    });
    test("Calculate profit for crop with high sun and low wind", () => {
        expect(getProfitForCrop(input, envFactors4)).toBe(97.5);
    });
});

describe("getTotalProfit", () => {
    test("Calculate profit for multiple crops without environment factors", () => {
        expect(getTotalProfit({crops}, noEnvFactors)).toBe(54);
    });
    test("Calculate profit for multiple crops with high sund and medium wind", () => {
        expect(getTotalProfit({crops}, envFactors1)).toBe(56.155);
    });
    test("Calculate profit for multiple crops with low sun and heavy wind", () => {
        expect(getTotalProfit({crops}, envFactors2)).toBe(25.5);
    });
    test("Calculate profit for multiple crops with medium sun and heavy wind", () => {
        expect(getTotalProfit({crops}, envFactors3)).toBe(31.5);
    });
    test("Calculate profit for multiple crops with high sun and low wind", () => {
        expect(getTotalProfit({crops}, envFactors4)).toBe(73.03);
    });
});
