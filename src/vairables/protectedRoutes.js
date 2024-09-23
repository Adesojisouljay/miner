import nigeria from "../assets/nigria.png"
import Usa from "../assets/Usa.webp"

export  const protectedRoutesArray = [
    '/dashboard',
    '/controller',
    '/test',
    '/spinner',
    '/kyc',
    '/manage-kyc',
    '/merchant-action',
    '/create-merchant',
    '/accounts',
    '/fiat-withdrawal-action',
    '/fiat-deposit-action',
  ];

  export const currenciesList = [
    {
      name: "NGN",
      sign: "₦",
      image: nigeria
    },
    {
      name: "USD",
      sign: "$",
      image: Usa
    }
  ]