export function getEligibleSchemes(userData, schemes) {
  return schemes.filter((scheme) => {
    // 1. Age Check
    if (scheme.eligibility.minAge && userData.age < scheme.eligibility.minAge) {
      return false;
    }

    // 2. Income Check (If scheme requires <1L, and user has >1L, reject)
    if (scheme.eligibility.maxIncomeLevel !== "Any") {
      if (scheme.eligibility.maxIncomeLevel === "<1L" && userData.income !== "<1L") return false;
      if (scheme.eligibility.maxIncomeLevel === "1-2.5L" && userData.income === ">2.5L") return false;
    }

    // 3. Land Check
    if (scheme.eligibility.landRequirement !== "Any") {
      if (!scheme.eligibility.landRequirement.includes(userData.land)) {
        return false;
      }
    }

    return true; // If it passes all checks, the scheme is a match!
  });
}