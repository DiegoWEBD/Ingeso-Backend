select d.name, d.presentation, d.description, 
ap.method, ap.procedure, 
r.reaction, dca.classification
from drug d 
left join administration_procedure ap 
on d.name = ap.drug_name
left join ram r 
on d.name = r.drug_name
left join drug_classification_association dca
on d.name = dca.drug_name
where d.name = 'name';