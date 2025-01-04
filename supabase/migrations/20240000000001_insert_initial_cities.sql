-- Insert initial cities data
INSERT INTO public.cities (
    name, bundesland, hebesatz, grundsteuerB, einwohner,
    transport, internet, business,
    officeRent, utilities, salary
)
VALUES 
    ('München', 'Bayern', 490, 535, 1488202, 95, 90, 92, 38.5, 280, 4800),
    ('Hamburg', 'Hamburg', 470, 540, 1841179, 90, 88, 88, 28.5, 265, 4500),
    ('Berlin', 'Berlin', 410, 810, 3669495, 85, 92, 90, 26.0, 250, 4200),
    ('Frankfurt', 'Hessen', 460, 500, 753056, 92, 85, 95, 35.0, 270, 4600),
    ('Köln', 'Nordrhein-Westfalen', 475, 515, 1087863, 88, 86, 85, 25.0, 255, 4300);