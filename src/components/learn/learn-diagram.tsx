import { getHomeContent } from "@/content/home";
import type { DiagramKey } from "@/content/learn/types";
import {
  CredentialDiagram,
  DisclosureDiagram,
  FlowDiagram,
  PseudonymDiagram,
  RolesDiagram,
  TrustChainDiagram,
  ZkDiagram,
} from "@/components/home-diagrams";
import { HowItWorks } from "@/components/how-it-works";

/**
 * Hazır şemalar (ana sayfadakilerle aynı çizim ve etiketler). Yeni bir şema gerekiyorsa önce home-diagrams.tsx'e eklenir,
 * sonra buraya bir anahtar olarak bağlanır.
 */
export function LearnDiagram({ diagram, locale }: { diagram: DiagramKey; locale: string }) {
  const h = getHomeContent(locale);
  const topic = <K extends "credential" | "disclosure" | "zk" | "pseudonym" | "chain">(id: K) =>
    h.tech.topics.find((x) => x.id === id) as Extract<(typeof h.tech.topics)[number], { id: K }>;

  switch (diagram) {
    case "flow":
      return <FlowDiagram l={h.how.flow} />;
    case "how-it-works":
      return <HowItWorks locale={locale} />;
    case "credential":
      return <CredentialDiagram l={topic("credential").d} />;
    case "disclosure":
      return <DisclosureDiagram l={topic("disclosure").d} />;
    case "zk":
      return <ZkDiagram l={topic("zk").d} />;
    case "pseudonym":
      return <PseudonymDiagram l={topic("pseudonym").d} />;
    case "trust-chain":
      return <TrustChainDiagram l={topic("chain").d} />;
    case "roles":
      return <RolesDiagram l={h.gov.roles} />;
  }
}
