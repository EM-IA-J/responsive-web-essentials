import { Briefcase, GraduationCap, Download, Star, Award, Mail, Phone, MapPin, Globe } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useState } from 'react';

interface ExperienceProps {
  company: string;
  period: string;
  title: string;
  description?: string;
  delay?: number;
}

const Experience = ({ company, period, title, description, delay = 0 }: ExperienceProps) => {
  return (
    <AnimatedSection delay={delay} animation="fade-in-left">
      <div className="mb-8 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/20">
        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
        <h3 className="text-xl font-bold mb-1 text-primary">{company}</h3>
        <div className="flex flex-wrap items-center text-sm text-foreground/70 mb-2">
          <span className="font-medium">{period}</span>
        </div>
        <h4 className="text-lg font-semibold mb-3">{title}</h4>
        {description && <p className="text-foreground/70">{description}</p>}
      </div>
    </AnimatedSection>
  );
};

const Skill = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={`${i < level ? 'text-primary fill-primary' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const CV = () => {
  const skills = [
    { name: "Art Direction", level: 5 },
    { name: "Creative Design", level: 5 },
    { name: "Graphic Design", level: 5 },
    { name: "Brand Identity", level: 4 },
    { name: "Adobe Creative Suite", level: 5 },
    { name: "UI/UX Design", level: 4 },
    { name: "Project Management", level: 4 },
    { name: "Team Leadership", level: 4 }
  ];

  return (
    <section id="cv" className="section py-24">
      <div className="content-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary">
            <img
              src="./img/img_drew-8.png"
              alt="Andrea Sanguino"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
            Curriculum Vitae
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Andrea Sanguino
          </h2>
          <p className="text-xl text-foreground/70 mb-6">
            Art Director & Creative Designer
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center text-sm">
              <Mail size={16} className="mr-2 text-primary" />
              <span>asanguiba@gmail.com</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone size={16} className="mr-2 text-primary" />
              <span>+34 647 08 52 06</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin size={16} className="mr-2 text-primary" />
              <span>Madrid, España</span>
            </div>
            <div className="flex items-center text-sm">
              <Globe size={16} className="mr-2 text-primary" />
              <span>www.andreasanguino.com</span>
            </div>
          </div>
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <Download size={18} className="mr-2" /> Descargar CV
          </a>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Briefcase size={24} className="text-primary mr-3" />
                <h3 className="text-2xl font-bold">Experiencia Profesional</h3>
              </div>

              <Experience
                company="TRECE LUCCE"
                period="08/2024 - Actualidad"
                title="Art Director"
                delay={0}
              />
              
              <Experience
                company="RYPPLES"
                period="01/2023 - 08/2024"
                title="Art Director & Senior Creative Designer"
                delay={100}
              />
              
              <Experience
                company="FREELANCE"
                period="2021 - 2023"
                title="Art Director & Graphic Designer"
                description="Colaboración con múltiples clientes en proyectos de diseño gráfico, identidad de marca y dirección artística."
                delay={200}
              />
              
              <Experience
                company="TBWA\"
                period="2020"
                title="Art Director Junior"
                delay={300}
              />
              
              <Experience
                company="GEOMETRY GLOBAL"
                period="2019"
                title="Art Trainee"
                delay={400}
              />
              
              <Experience
                company="DDB MADRID"
                period="2019"
                title="Art Trainee"
                delay={500}
              />
              
              <Experience
                company="BAD ASS STUDIO"
                period="2018"
                title="Art Direction & Production Assistant"
                delay={600}
              />
            </div>

            <div className="mb-12">
              <div className="flex items-center mb-6">
                <GraduationCap size={24} className="text-primary mr-3" />
                <h3 className="text-2xl font-bold">Educación</h3>
              </div>

              <Experience
                company="Universidad Complutense de Madrid"
                period="2015 - 2019"
                title="Grado en Bellas Artes, especialidad en Diseño"
                delay={700}
              />
              
              <Experience
                company="IED Madrid"
                period="2017 - 2018"
                title="Curso de Especialización en Dirección de Arte"
                delay={800}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border/30 mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Award size={20} className="text-primary mr-2" /> Habilidades
              </h3>
              
              <div>
                {skills.map((skill, index) => (
                  <Skill key={index} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-border/30 mb-8">
              <h3 className="text-xl font-bold mb-6">Idiomas</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Español</span>
                    <span className="text-sm text-foreground/70">Nativo</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Inglés</span>
                    <span className="text-sm text-foreground/70">Avanzado (C1)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Francés</span>
                    <span className="text-sm text-foreground/70">Intermedio (B1)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-border/30 mb-8">
              <h3 className="text-xl font-bold mb-6">Logros</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="text-primary mr-3">•</div>
                  <p className="text-sm text-foreground/70">Premio Jóvenes Creativos, Festival El Sol 2022</p>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-3">•</div>
                  <p className="text-sm text-foreground/70">Finalista en los Premios Nacionales de Creatividad 2021</p>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-3">•</div>
                  <p className="text-sm text-foreground/70">Reconocimiento "Talento Emergente" en FIAP 2020</p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-border/30">
              <h3 className="text-xl font-bold mb-6">Sobre mí</h3>
              <p className="text-foreground/70 mb-4">
                Soy una Art Director con más de 5 años de experiencia en el sector creativo. Mi enfoque combina una sólida base artística con habilidades técnicas avanzadas para crear soluciones visuales impactantes.
              </p>
              <p className="text-foreground/70">
                Especializada en dirección de arte, diseño gráfico y branding, mi objetivo es trasladar los valores de marca a experiencias visuales memorables que conecten con el público objetivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;