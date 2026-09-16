import MigrationCard, { MigrationStep } from "./MigrationCard";
import {
  Step1Notebook,
  Step1Excel,
  Step1Receipt,
  Step1Cloud,
  Step2PriceTag,
  Step2InventoryBox,
  Step2Customer,
  Step2Register,
  Step3ChatBubble,
  Step3Timer,
  Step3Lightning,
  Step3NoCourse,
} from "./MigrationVisuals";

export const steps: MigrationStep[] = [
  {
    id: "data",
    title: "Pasamos tu libreta a digital.",
    description:
      "Tomamos tus notas, cuadernos y Excels, los limpiamos y los cargamos por ti. Empiezas con toda tu información en orden sin pasar noches digitando.",
    elements: {
      topLeft: <Step1Notebook />,
      topRight: <Step1Excel />,
      bottomLeft: <Step1Receipt />,
      bottomRight: <Step1Cloud />,
    },
  },
  {
    id: "ready",
    title: "Tu tienda queda lista para vender.",
    description:
      "Inventario cargado, fiados al día y clientes registrados. El día que arrancas, abres tu local y cobras con normalidad desde el primer minuto.",
    elements: {
      topLeft: <Step2PriceTag />,
      topRight: <Step2InventoryBox />,
      bottomLeft: <Step2Customer />,
      bottomRight: <Step2Register />,
    },
  },
  {
    id: "team",
    title: "Tu equipo aprende en diez minutos.",
    description:
      "Vender en mostrador, registrar un abono o consultar el stock es tan intuitivo como enviar un mensaje por WhatsApp. Sin cursos técnicos.",
    elements: {
      topLeft: <Step3ChatBubble />,
      topRight: <Step3Timer />,
      bottomLeft: <Step3Lightning />,
      bottomRight: <Step3NoCourse />,
    },
  },
];


export default function MigrationContent() {
  return (
    <div className="migration-cards-container relative w-full">
      {steps.map((step, idx) => (
        <MigrationCard key={step.id} step={step} index={idx} />
      ))}
    </div>
  );
}
