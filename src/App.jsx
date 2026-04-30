import { useState, useEffect } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './App.css'

function App() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState(() => {
    const guardado = localStorage.getItem('audit-30-respuestas');
    return guardado ? JSON.parse(guardado) : {};
  });

  useEffect(() => {
    localStorage.setItem('audit-30-respuestas', JSON.stringify(respuestas));
  }, [respuestas]);

  const cuestionario = [
    // 1. DIGNIDAD HUMANA
    {
      id: 1,
      cat: "Dignidad Humana",
      p: "¿Cómo es la cultura de respeto hacia el personal?",
      opts: [
        { t: "Cultura organizacional basada en respeto, reconocimiento y bienestar activo", pts: 4 },
        { t: "Entorno profesional respetuoso con prácticas consolidadas", pts: 3 },
        { t: "Trato correcto pero sin políticas claras", pts: 1 },
        { t: "Ambiente laboral conflictivo o irrespetuoso", pts: 0 }
      ]
    },
    {
      id: 2,
      cat: "Dignidad Humana",
      p: "¿Cómo se garantizan los derechos humanos en la cadena de suministro?",
      opts: [
        { t: "Auditorías externas periódicas y certificaciones", pts: 4 },
        { t: "Evaluación interna con criterios documentados", pts: 3 },
        { t: "Criterios informales sin seguimiento", pts: 1 },
        { t: "No se evalúa", pts: 0 }
      ]
    },
    {
      id: 3,
      cat: "Dignidad Humana",
      p: "¿Cómo son las condiciones laborales ofrecidas?",
      opts: [
        { t: "Superan ampliamente el convenio y fomentan bienestar", pts: 4 },
        { t: "Cumplen convenio con mejoras adicionales", pts: 3 },
        { t: "Cumplen estrictamente lo legal", pts: 1 },
        { t: "Condiciones precarias o inadecuadas", pts: 0 }
      ]
    },
    {
      id: 4,
      cat: "Dignidad Humana",
      p: "¿Cómo se gestiona la salud física y mental del personal?",
      opts: [
        { t: "Plan integral de bienestar con seguimiento activo", pts: 4 },
        { t: "Medidas preventivas estructuradas", pts: 3 },
        { t: "Acciones puntuales sin estrategia", pts: 1 },
        { t: "No se aborda", pts: 0 }
      ]
    },
    {
      id: 5,
      cat: "Dignidad Humana",
      p: "¿Qué nivel de inclusión y diversidad existe?",
      opts: [
        { t: "Plan de igualdad activo con indicadores y seguimiento", pts: 4 },
        { t: "Políticas definidas parcialmente aplicadas", pts: 3 },
        { t: "Intención sin medidas concretas", pts: 1 },
        { t: "No es una prioridad", pts: 0 }
      ]
    },
    {
      id: 6,
      cat: "Dignidad Humana",
      p: "¿Cómo se facilita la conciliación laboral y personal?",
      opts: [
        { t: "Flexibilidad total y medidas personalizadas", pts: 4 },
        { t: "Flexibilidad estructurada (horarios/adaptaciones)", pts: 3 },
        { t: "Medidas limitadas", pts: 1 },
        { t: "Horario rígido sin adaptación", pts: 0 }
      ]
    },

    // 2. SOLIDARIDAD
    {
      id: 7,
      cat: "Solidaridad",
      p: "¿Qué nivel de cooperación existe con otras empresas?",
      opts: [
        { t: "Colaboración activa y alianzas estratégicas", pts: 4 },
        { t: "Cooperación frecuente en proyectos", pts: 3 },
        { t: "Contactos puntuales", pts: 1 },
        { t: "Competencia exclusivamente", pts: 0 }
      ]
    },
    {
      id: 8,
      cat: "Solidaridad",
      p: "¿Qué peso tienen los proveedores locales?",
      opts: [
        { t: "Más del 80% de proximidad", pts: 4 },
        { t: "Entre 50% y 80%", pts: 3 },
        { t: "Menos del 50%", pts: 1 },
        { t: "Se prioriza solo el precio", pts: 0 }
      ]
    },
    {
      id: 9,
      cat: "Solidaridad",
      p: "¿Cómo se gestiona el intercambio de conocimiento?",
      opts: [
        { t: "Compartición abierta (alianzas, open source, formación)", pts: 4 },
        { t: "Colaboración estructurada bajo acuerdos", pts: 3 },
        { t: "Se comparte solo bajo demanda", pts: 1 },
        { t: "Se mantiene como ventaja competitiva cerrada", pts: 0 }
      ]
    },
    {
      id: 10,
      cat: "Solidaridad",
      p: "¿Cómo contribuye la empresa a proyectos sociales?",
      opts: [
        { t: "Apoyo sistemático con impacto medible", pts: 4 },
        { t: "Colaboraciones periódicas", pts: 3 },
        { t: "Aportes puntuales", pts: 1 },
        { t: "No participa", pts: 0 }
      ]
    },
    {
      id: 11,
      cat: "Solidaridad",
      p: "¿Cómo son los plazos de pago a proveedores?",
      opts: [
        { t: "Pago inmediato o <30 días", pts: 4 },
        { t: "Entre 30 y 45 días", pts: 3 },
        { t: "Plazo legal estándar", pts: 1 },
        { t: "Retrasos habituales o >60 días", pts: 0 }
      ]
    },
    {
      id: 12,
      cat: "Solidaridad",
      p: "¿Participa en redes de economía responsable?",
      opts: [
        { t: "Participación activa en redes EBC u otras", pts: 4 },
        { t: "Colaboración ocasional", pts: 3 },
        { t: "Conocimiento sin implicación", pts: 1 },
        { t: "No participa", pts: 0 }
      ]
    },

    // 3. SOSTENIBILIDAD ECOLÓGICA
    {
      id: 13,
      cat: "Sostenibilidad Ecológica",
      p: "¿Cuál es el origen de la energía utilizada?",
      opts: [
        { t: "100% renovable certificada", pts: 4 },
        { t: "Mayoritariamente renovable", pts: 3 },
        { t: "Mix energético estándar", pts: 1 },
        { t: "Dependencia de fuentes fósiles", pts: 0 }
      ]
    },
    {
      id: 14,
      cat: "Sostenibilidad Ecológica",
      p: "¿Cómo se gestionan los residuos?",
      opts: [
        { t: "Modelo de residuo cero o economía circular", pts: 4 },
        { t: "Sistema avanzado de reciclaje", pts: 3 },
        { t: "Reciclaje básico", pts: 1 },
        { t: "Sin gestión específica", pts: 0 }
      ]
    },
    {
      id: 15,
      cat: "Sostenibilidad Ecológica",
      p: "¿Cómo fomenta la empresa la movilidad sostenible?",
      opts: [
        { t: "Incentivos económicos y políticas activas", pts: 4 },
        { t: "Facilidades estructuradas (teletrabajo, transporte)", pts: 3 },
        { t: "Medidas limitadas", pts: 1 },
        { t: "No se fomenta", pts: 0 }
      ]
    },
    {
      id: 16,
      cat: "Sostenibilidad Ecológica",
      p: "¿Qué nivel de ecodiseño tienen los productos/servicios?",
      opts: [
        { t: "Diseño circular y ciclo de vida completo", pts: 4 },
        { t: "Diseño duradero y eficiente", pts: 3 },
        { t: "Mejoras puntuales", pts: 1 },
        { t: "Diseño desechable", pts: 0 }
      ]
    },
    {
      id: 17,
      cat: "Sostenibilidad Ecológica",
      p: "¿Qué eficiencia tienen los equipos utilizados?",
      opts: [
        { t: "Tecnología de máxima eficiencia (A+++ o equivalente)", pts: 4 },
        { t: "Equipos eficientes actualizados", pts: 3 },
        { t: "Equipos estándar", pts: 1 },
        { t: "Equipos obsoletos", pts: 0 }
      ]
    },
    {
      id: 18,
      cat: "Sostenibilidad Ecológica",
      p: "¿Cómo mide la empresa su impacto ambiental?",
      opts: [
        { t: "Huella de carbono medida y publicada", pts: 4 },
        { t: "Indicadores ambientales completos internos", pts: 3 },
        { t: "Control básico de consumos", pts: 1 },
        { t: "No se mide", pts: 0 }
      ]
    },

    // 4. JUSTICIA SOCIAL
    {
      id: 19,
      cat: "Justicia Social",
      p: "¿Cuál es la relación salarial interna?",
      opts: [
        { t: "Menor a 1:3", pts: 4 },
        { t: "Entre 1:3 y 1:10", pts: 3 },
        { t: "Entre 1:10 y 1:20", pts: 1 },
        { t: "Mayor a 1:20", pts: 0 }
      ]
    },
    {
      id: 20,
      cat: "Justicia Social",
      p: "¿Cómo gestiona la empresa su responsabilidad fiscal?",
      opts: [
        { t: "Pago íntegro y transparente en el territorio", pts: 4 },
        { t: "Cumplimiento sin prácticas agresivas", pts: 3 },
        { t: "Optimización fiscal dentro de la legalidad", pts: 1 },
        { t: "Uso de estructuras opacas", pts: 0 }
      ]
    },
    {
      id: 21,
      cat: "Justicia Social",
      p: "¿Cómo se distribuyen los beneficios?",
      opts: [
        { t: "Reinversión prioritaria en impacto social/ambiental", pts: 4 },
        { t: "Reparto equilibrado entre partes", pts: 3 },
        { t: "Distribución centrada en propietarios", pts: 1 },
        { t: "Sin criterios equitativos", pts: 0 }
      ]
    },
    {
      id: 22,
      cat: "Justicia Social",
      p: "¿Qué nivel de igualdad de género existe?",
      opts: [
        { t: "Igualdad total con seguimiento y métricas", pts: 4 },
        { t: "Pequeñas diferencias controladas", pts: 3 },
        { t: "Brechas sin seguimiento", pts: 1 },
        { t: "Sin control ni medidas", pts: 0 }
      ]
    },
    {
      id: 23,
      cat: "Justicia Social",
      p: "¿Cómo se definen los precios?",
      opts: [
        { t: "Precios justos alineados con impacto social", pts: 4 },
        { t: "Equilibrio entre mercado e impacto", pts: 3 },
        { t: "Basado en mercado", pts: 1 },
        { t: "Maximización del beneficio", pts: 0 }
      ]
    },
    {
      id: 24,
      cat: "Justicia Social",
      p: "¿Cómo se fomenta el desarrollo profesional?",
      opts: [
        { t: "Plan estructurado accesible a toda la plantilla", pts: 4 },
        { t: "Programas formativos regulares", pts: 3 },
        { t: "Formación limitada", pts: 1 },
        { t: "No se promueve", pts: 0 }
      ]
    },

    // 5. DEMOCRACIA
    {
      id: 25,
      cat: "Democracia",
      p: "¿Qué nivel de transparencia tiene la información interna?",
      opts: [
        { t: "Transparencia total (finanzas, decisiones, impacto)", pts: 4 },
        { t: "Acceso amplio a información relevante", pts: 3 },
        { t: "Información básica", pts: 1 },
        { t: "Información restringida", pts: 0 }
      ]
    },
    {
      id: 26,
      cat: "Democracia",
      p: "¿Cómo se toman las decisiones estratégicas?",
      opts: [
        { t: "Participación democrática estructurada", pts: 4 },
        { t: "Consulta sistemática al equipo", pts: 3 },
        { t: "Consulta ocasional", pts: 1 },
        { t: "Decisión unilateral", pts: 0 }
      ]
    },
    {
      id: 27,
      cat: "Democracia",
      p: "¿Cómo es la estructura organizativa?",
      opts: [
        { t: "Horizontal y colaborativa", pts: 4 },
        { t: "Estructura mixta", pts: 3 },
        { t: "Jerarquía tradicional", pts: 1 },
        { t: "Estructura rígida y vertical", pts: 0 }
      ]
    },
    {
      id: 28,
      cat: "Democracia",
      p: "¿Cómo se eligen los cargos de responsabilidad?",
      opts: [
        { t: "Elección democrática", pts: 4 },
        { t: "Proceso participativo", pts: 3 },
        { t: "Designación con validación", pts: 1 },
        { t: "Designación directa", pts: 0 }
      ]
    },
    {
      id: 29,
      cat: "Democracia",
      p: "¿Qué tipo de memoria anual se elabora?",
      opts: [
        { t: "Balance del Bien Común completo", pts: 4 },
        { t: "Informe con impacto social y ambiental", pts: 3 },
        { t: "Solo información financiera", pts: 1 },
        { t: "No se elabora", pts: 0 }
      ]
    },
    {
      id: 30,
      cat: "Democracia",
      p: "¿Cómo se gestionan los grupos de interés?",
      opts: [
        { t: "Diálogo continuo e integración en decisiones", pts: 4 },
        { t: "Consulta periódica estructurada", pts: 3 },
        { t: "Encuestas puntuales", pts: 1 },
        { t: "No se consideran", pts: 0 }
      ]
    }

  ];

  const totalPuntos = Object.values(respuestas).reduce((a, b) => a + b, 0);
  const esUltimoPaso = paso === cuestionario.length;

  const calcularDatosGrafico = () => {
    const categorias = ["Dignidad Humana", "Solidaridad", "Sostenibilidad Ecológica", "Justicia Social", "Democracia"];
    return categorias.map(cat => {
      const preguntasCat = cuestionario.filter(q => q.cat === cat);
      const puntosCat = preguntasCat.reduce((acc, q) => acc + (respuestas[q.id] || 0), 0);
      return { subject: cat, A: puntosCat, fullMark: 24 };
    });
  };

  const getDiagnosticosCriticos = () => {
    const datos = calcularDatosGrafico();
    const puntuacionMinima = Math.min(...datos.map(d => d.A));
    const pilaresCriticos = datos.filter(d => d.A === puntuacionMinima);

    return pilaresCriticos.map(pilar => {
      const fallosPilar = cuestionario.filter(q => q.cat === pilar.subject && (respuestas[q.id] || 0) < 4);
      return {
        cat: pilar.subject,
        puntos: pilar.A,
        mejoras: fallosPilar.map(q => ({
          problema: q.p,
          solucion: q.opts.find(o => o.pts === 4).t
        }))
      };
    });
  };

  const seleccionarOpcion = (pts) => {
    const id = cuestionario[paso].id;

    if (respuestas[id] === pts) {
      // Si ya está seleccionada → desmarcar
      const nuevasRespuestas = { ...respuestas };
      delete nuevasRespuestas[id];
      setRespuestas(nuevasRespuestas);
    } else {
      // Si no → seleccionar normal
      setRespuestas({ ...respuestas, [id]: pts });
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Eco-Audit 🌿</h1>
        <p>Consultoría de Sostenibilidad | Jorge Varela Candela</p>
        {!esUltimoPaso && (
          <div style={{ marginTop: '30px' }}>
            <span className="progress-text">Pregunta {paso + 1} de 30</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((paso + 1) / cuestionario.length) * 100}%` }}></div>
            </div>
          </div>
        )}
      </header>

      {!esUltimoPaso ? (
        <main className="card">
          <div style={{ textAlign: 'center' }}><span className="categoria-tag">{cuestionario[paso].cat}</span></div>
          <h2 style={{ fontSize: '1.4rem', textAlign: 'center', margin: '20px 0' }}>{cuestionario[paso].p}</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cuestionario[paso].opts.map((opt, i) => (
              <button key={i} className={`btn-opcion ${respuestas[cuestionario[paso].id] === opt.pts ? 'active' : ''}`} onClick={() => seleccionarOpcion(opt.pts)}>
                {opt.t}
              </button>
            ))}
          </div>
          <div className="nav-container">
            <button className="btn-nav" disabled={paso === 0} onClick={() => setPaso(paso - 1)}>⬅️ Anterior</button>
            <button className="btn-nav btn-next" disabled={respuestas[cuestionario[paso].id] === undefined} onClick={() => setPaso(paso + 1)}>
              {paso === 29 ? "Finalizar ✅" : "Siguiente ➡️"}
            </button>
          </div>
        </main>
      ) : (
        <main className="card" style={{ textAlign: 'center' }}>
          <div className="resultado-box">
            <h2>Puntuación Global</h2>
            <div className="puntos-large">{totalPuntos}</div>
            <div style={{ padding: '8px 20px', background: totalPuntos > 80 ? '#27ae60' : totalPuntos > 40 ? '#f39c12' : '#e74c3c', borderRadius: '25px', fontWeight: 'bold' }}>
              {totalPuntos > 80 ? 'Óptimo' : totalPuntos > 40 ? 'Mejorable' : 'Crítico'}
            </div>
          </div>

          <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
            <h3>Análisis de Madurez por Pilar</h3>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={calcularDatosGrafico()}>
                <PolarGrid stroke="#ccc" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 'bold' }} />

                {/* AÑADE ESTA LÍNEA PARA FIJAR EL MÁXIMO EN 24 */}
                <PolarRadiusAxis angle={30} domain={[0, 24]} tick={false} axisLine={false} />

                <Radar
                  name="Pyme"
                  dataKey="A"
                  stroke="#27ae60"
                  fill="#27ae60"
                  fillOpacity={0.6}
                  dot={{ r: 4, fill: "#27ae60" }} // Esto añade los puntitos en los vértices
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* LISTADO DINÁMICO DE ÁREAS CRÍTICAS */}
          <div style={{ marginTop: '40px', textAlign: 'left' }}>
            {getDiagnosticosCriticos().map((diag, idx) => (
              <div key={idx} style={{ background: '#fff5f5', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #e74c3c', marginBottom: '20px' }}>
                <h3 style={{ color: '#c0392b', marginTop: 0 }}>⚠️ Área Crítica: {diag.cat}</h3>
                <p>Has obtenido solo <strong>{diag.puntos} / 24</strong> puntos en esta área.</p>
                <div style={{ marginTop: '15px' }}>
                  <strong style={{ color: '#2d3748' }}>Acciones Recomendadas:</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px', color: '#4a5568' }}>
                    {diag.mejoras.map((m, i) => (
                      <li key={i} style={{ marginBottom: '10px' }}>
                        Para <em>"{m.problema}"</em> deberías implementar: <strong>{m.solucion}</strong>.
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-nav" style={{ marginTop: '30px', width: '100%' }} onClick={() => { localStorage.clear(); window.location.reload(); }}>Reiniciar Auditoría</button>
        </main>
      )}
    </div>
  )
}

export default App
