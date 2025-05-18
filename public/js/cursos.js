async function carregarCursos() {
  try {
    const resposta = await fetch("http://localhost:3001/degree");
    if (!resposta.ok) throw new Error("Erro ao buscar os cursos");

    const cursos = await resposta.json();
    const lista = document.getElementById("lista-cursos");

    cursos.forEach((curso) => {
      const item = document.createElement("li");
      item.textContent = `${curso.acronym} - ${curso.name} (${curso.period})`;
      item.style.cursor = "pointer";
      item.dataset.id = curso.iddegree;

      item.addEventListener("click", () => {
        carregarDisciplinas(curso.iddegree);
      });

      lista.appendChild(item);
    });
  } catch (erro) {
    console.error(erro);
  }
}

async function carregarDisciplinas(idDegree) {
  try {
    const resposta = await fetch(`http://localhost:3001/course/${idDegree}`);
    if (!resposta.ok) throw new Error("Erro ao buscar disciplinas");

    const disciplinas = await resposta.json();

    const tabela = document.getElementById("tabela-disciplinas");
    const tbody = tabela.querySelector("tbody");
    const titulo = document.getElementById("titulo-disciplinas");

    tbody.innerHTML = "";

    disciplinas.forEach((disciplina) => {
      const tr = document.createElement("tr");
      tr.dataset.iddegree = disciplina.iddegree;
      tr.dataset.idcourse = disciplina.idcourse;
      tr.dataset.semester = disciplina.semester;

      const tdName = document.createElement("td");
      tdName.textContent = disciplina.name;

      const tdSemester = document.createElement("td");
      tdSemester.textContent = disciplina.semester;
      tdSemester.style.cursor = "pointer";
      tdSemester.addEventListener("click", () => {
        carregarHorarios(disciplina.iddegree, disciplina.semester);
      });

      const tdProfessor = document.createElement("td");
      tdProfessor.textContent = disciplina.professor.name;

      tr.appendChild(tdName);
      tr.appendChild(tdSemester);
      tr.appendChild(tdProfessor);
      tbody.appendChild(tr);
    });

    tabela.style.display = "table";
    titulo.style.display = "block";
  } catch (erro) {
    console.error(erro);
  }
}

async function carregarHorarios(idDegree, semester) {
  try {
    const resposta = await fetch(`http://localhost:3001/roomHasCourse/${idDegree}/${semester}`);
    if (!resposta.ok) throw new Error('Erro ao buscar horários');

    const horarios = await resposta.json();

    const tabela = document.getElementById('tabela-horarios');
    const tbody = tabela.querySelector('tbody');
    const titulo = document.getElementById('titulo-horarios');

    tbody.innerHTML = '';

    const diasSemana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira'];
    const faixasHorarios = [
      { inicio: '18:45:00', fim: '19:35:00', label: '18h45 a 19h35' },
      { inicio: '19:35:00', fim: '20:25:00', label: '19h35 a 20h25' },
      { inicio: '20:25:00', fim: '21:15:00', label: '20h25 a 21h15' },
      { inicio: '21:25:00', fim: '22:15:00', label: '21h25 a 22h15' },
      { inicio: '22:15:00', fim: '23:05:00', label: '22h15 a 23h05' }
    ];

    // Função utilitária para converter "HH:mm:ss" em minutos
    function horarioParaMinutos(horaStr) {
      const [h, m, s] = horaStr.split(':').map(Number);
      return h * 60 + m;
    }

    // Inicializa a matriz da grade
    const grade = Array.from({ length: faixasHorarios.length }, () => {
      const linha = {};
      diasSemana.forEach(dia => linha[dia] = '');
      return linha;
    });

    horarios.forEach(h => {
      const dia = h.day_of_week;
      const disciplina = h.course.name;
      const inicioMin = horarioParaMinutos(h.begin);
      const fimMin = horarioParaMinutos(h.finish);

      faixasHorarios.forEach((faixa, i) => {
        const faixaInicioMin = horarioParaMinutos(faixa.inicio);
        const faixaFimMin = horarioParaMinutos(faixa.fim);

        // Verifica se há sobreposição de faixa
        if (fimMin > faixaInicioMin && inicioMin < faixaFimMin) {
          grade[i][dia] = disciplina;
        }
      });
    });

    // Renderiza a tabela
    faixasHorarios.forEach((faixa, i) => {
      const tr = document.createElement('tr');
      const tdHorario = document.createElement('td');
      tdHorario.textContent = faixa.label;
      tr.appendChild(tdHorario);

      diasSemana.forEach(dia => {
        const td = document.createElement('td');
        td.textContent = grade[i][dia];
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    tabela.style.display = 'table';
    titulo.style.display = 'block';
  } catch (erro) {
    console.error(erro);
  }
}

window.onload = carregarCursos;
