const FeaturesSection = () => {
  return (
    <section className="mt-24 text-center animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Warum Gewerbesteuer vergleichen?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
        <div className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Kosten optimieren</h3>
          <p className="text-muted-foreground">
            Durch die Wahl des richtigen Standorts können Sie erhebliche Steuerersparnisse erzielen.
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Transparent vergleichen</h3>
          <p className="text-muted-foreground">
            Alle Hebesätze und Informationen übersichtlich auf einen Blick.
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Fundiert entscheiden</h3>
          <p className="text-muted-foreground">
            Treffen Sie Ihre Standortentscheidung auf Basis aktueller Daten.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;