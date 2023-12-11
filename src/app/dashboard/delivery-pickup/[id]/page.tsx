// sections

import { DeliveryPickupEditLocation } from "src/sections/Delivery-Pickup/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Edit Location',
};

type Props = {
  params: {
    id: string;
  };
};

export default function AddNewLocationPage({ params }: Props) {
  const { id } = params;

  console.log("id", id);

  return <DeliveryPickupEditLocation id={id} />;
}
