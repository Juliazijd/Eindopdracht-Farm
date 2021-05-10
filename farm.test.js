const { getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield, 
    getCostForPlant,
    getCostForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
} = require("./farm")

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
}
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
}

describe("getYieldForPlant", () => {
    const input = {
        crop: corn,
        numCrops: 10,
        }
    const noEnvFactors = {
        sun: "medium",
        wind: "low"
        }

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(input, noEnvFactors)).toBe(3)
    })

})
/*_______________________________________________________________________*/

describe("getYieldForCrop", () => {
    const input = {
        crop: corn,
        numCrops: 10,
        }

    test("Get yield for crop with no evironment factors", () => {
        const noEnvFactors = {
            sun: "medium",
            wind: "low"
            }
        expect(getYieldForCrop(input, noEnvFactors)).toBe(30)
    })

    test("Get yield for crop with high sun and medium wind", () => {
        const envFactors = {
            sun: "high",
            wind: "medium"
            }
        expect(getYieldForCrop(input, envFactors)).toBe(31.5)
    })

    test("Get yield for crop with medium sun and heavy wind", () => {
        const envFactors = {
            sun: "medium",
            wind: "heavy"
            }
        expect(Math.round(getYieldForCrop(input, envFactors))).toBe(12)
    })

})
/*_______________________________________________________________________*/

describe("getTotalYield", () => {
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
        ]

    test("Calculate total yield with multiple crops", () => {
        const noEnvFactors = {
            sun: "medium",
            wind: "low"
            }
        expect(getTotalYield({crops}, noEnvFactors)).toBe(23);
    })

    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, numCrops: 0 }]
        const noEnvFactors = {
            sun: "medium",
            wind: "low"
            }
        expect(getTotalYield({crops}, noEnvFactors)).toBe(0)
    })

    test("Calculate total yield with multiple crops with low sun and heavy wind", () => {
        const envFactors = {
            sun: "low",
            wind: "heavy"
            }
        expect(getTotalYield({crops}, envFactors)).toBe(11.6)
    })

    test("Calculate total yield with multiple crops with high sun and low wind", () => {
        const envFactors = {
            sun: "high",
            wind: "low"
            }
        expect(getTotalYield({crops}, envFactors)).toBe(30.58)
    })

})
/*_______________________________________________________________________*/

describe("getCostForPlant", () => {

    test("Calculate cost for plant, simple", () => {
        expect(getCostForPlant(corn)).toBe(1.5)
    })

})
/*_______________________________________________________________________*/

describe("getCostForCrop", () => {
    const input = {
        crop: corn,
        numCrops: 10,
        }
    test("Calculate cost for crop", () => {
        expect(getCostForCrop(input)).toBe(15)
    })
})
/*_______________________________________________________________________*/

describe("getRevenueForCrop", () => {
    const input = {
        crop: corn,
        numCrops: 10,
        }

    test("Calculate revenue for crop without environment factors", () => {
        const noEnvFactors = {
            sun: "medium",
            wind: "low"
            }
        expect(getRevenueForCrop(input, noEnvFactors)).toBe(75)
    })

    test("Calculate revenue for crop with high sun and medium wind", () => {
        const envFactors = {
            sun: "high",
            wind: "medium"
            }
        expect(getRevenueForCrop(input, envFactors)).toBe(78.75)
    })

    test("Calculate revenue for crop with low sun and heavy wind", () => {
        const envFactors = {
            sun: "low",
            wind: "heavy"
            }
        expect(getRevenueForCrop(input, envFactors)).toBe(18)
    })

})
/*_______________________________________________________________________*/

describe("getProfitForCrop", () => {
    const input = {
        crop: corn,
        numCrops: 10,
        }

    test("Calculate profit for crop without environment factors", () => {
        const noEnvFactors = {
            sun: "medium",
            wind: "low"
            }
        expect(getProfitForCrop(input, noEnvFactors)).toBe(60)
    })

    test("Calculate profit for crop with medium sun and heavy wind", () => {
        const envFactors = {
            sun: "medium",
            wind: "heavy"
            }
        expect(Math.round(getProfitForCrop(input, envFactors))).toBe(15)
    })

    test("Calculate profit for crop with high sun and low wind", () => {
        const envFactors = {
            sun: "high",
            wind: "low"
            }
        expect(getProfitForCrop(input, envFactors)).toBe(97.5)
    })

})

describe("getTotalProfit", () => {
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
        ]

    test("Calculate profit for multiple crops without environment factors", () => {
        const noEnvFactors = {
            sun: "medium",
            wind: "low"
            }
        expect(getTotalProfit({crops}, noEnvFactors)).toBe(54)
    })

    test("Calculate profit for multiple crops with high sund and medium wind", () => {
        const envFactors = {
            sun: "high",
            wind: "medium"
            }
        expect(getTotalProfit({crops}, envFactors)).toBe(56.155)
    })

    test("Calculate profit for multiple crops with low sun and heavy wind", () => {
        const envFactors = {
            sun: "low",
            wind: "heavy"
            }
        expect(getTotalProfit({crops}, envFactors)).toBe(25.5)
    })

    test("Calculate profit for multiple crops with medium sun and heavy wind", () => {
        const envFactors = {
            sun: "medium",
            wind: "heavy"
            }
        expect(getTotalProfit({crops}, envFactors)).toBe(31.5)
    })

    test("Calculate profit for multiple crops with high sun and low wind", () => {
        const envFactors = {
            sun: "high",
            wind: "low"
            }
        expect(getTotalProfit({crops}, envFactors)).toBe(73.03)
    })

})
