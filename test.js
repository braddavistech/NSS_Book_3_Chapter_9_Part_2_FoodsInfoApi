let painter = {
  tools: ["brush", "roller", "caulk", "sandpaper", "dropcloth"],
  uniform: "white overalls",
  cost_per_hour: 25.00,
  insured: true
}

let billing = painter.cost_per_hour;
console.log(billing);
painter.chargeClient = (a) => {
  
   return `The amount due is ` + billing + `.`;
  }
  console.log(painter.chargeClient());