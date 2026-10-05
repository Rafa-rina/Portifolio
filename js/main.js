/* ==========================================================================
   PORTFÓLIO - RAFAEL FERNANDES DURÃES
   --------------------------------------------------------------------------
   - Chaveador de Tema (Claro / Escuro degradê) com persistência em localStorage
   - Efeito de digitação dinâmica no Hero com dados do currículo de Rafael
   - Filtro interativo de projetos (Extensão Chrome, PWA, Flask CRUD, etc.)
   - Modal de detalhes dos projetos com dados reais
   - Animação de barras de habilidades ao rolar a página
   - Notificação Toast para envio de mensagem no formulário de contato
   - Navegação mobile responsiva
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. TEMA CLARO / ESCURO (THEME SWITCHER)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeLabel) themeLabel.textContent = 'Modo Claro';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeLabel) themeLabel.textContent = 'Modo Escuro';
    }
  }

  /* --------------------------------------------------------------------------
     2. EFEITO DE DIGITAÇÃO DINÂMICA (TYPING EFFECT)
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = [
      "Estudante de Ciência da Computação (5º Semestre)",
      "Projetos Acadêmicos em Python, Flask, C & JS",
      "Aprendizado em SQL, Git & Docker",
      "Em busca de Estágio na área de TI em Brasília"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typingSpeed = 2200; // Pausa após digitar frase inteira
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 350;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /* --------------------------------------------------------------------------
     3. NAVEGAÇÃO MOBILE (HAMBURGER MENU)
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. FILTRO DE PROJETOS
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. MODAL DE DETALHES DO PROJETO - DADOS REAIS DO CURRÍCULO DE RAFAEL
     -------------------------------------------------------------------------- */
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalCode = document.getElementById('modal-code');
  const modalClose = document.getElementById('modal-close');

  const projectsData = {
    'proj-1': {
      title: 'Link Saver – Extensão para Google Chrome',
      category: 'Projetos Acadêmicos (5º Semestre)',
      desc: 'Desenvolvimento de uma extensão para o navegador Google Chrome destinada a salvar e organizar links rapidamente. Inclui suporte a busca instantânea de favoritos, remoção simples e funcionalidade para exportação de dados em JSON. Versionado via Git e hospedado no GitHub.',
      tags: ['JavaScript', 'Chrome Extensions API', 'HTML5', 'CSS3', 'Git', 'GitHub'],
      codeSnippet: `// Manifest V3 - Chrome Extension Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ savedLinks: [] });
  console.log('Extensão Link Saver instalada com sucesso!');
});

async function saveCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const data = { title: tab.title, url: tab.url, date: new Date().toISOString() };
  // Salva no storage do Chrome
}`
    },
    'proj-2': {
      title: 'Rafa Restaurante – Aplicação Web',
      category: 'Desenvolvimento Frontend & Lógica',
      desc: 'Sistema interativo de pedidos e cardápio digital para restaurante. Desenvolvido com HTML5, CSS3 e JavaScript Vanilla, focado na experiência do usuário e dinamismo de dados.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'DOM Manipulation'],
      codeSnippet: `// Manipulação de Carrinho e Pedidos - Rafa Restaurante
function adicionarAoCarrinho(pratoId, quantidade) {
  const item = cardapio.find(p => p.id === pratoId);
  if (item) {
    carrinho.push({ ...item, qtd: quantidade });
    atualizarResumoPedido();
  }
}`
    },
    'proj-3': {
      title: 'Sistema CRUD Web (Flask & PostgreSQL)',
      category: 'Backend & Banco de Dados',
      desc: 'Desenvolvimento de uma aplicação web completa para cadastro, consulta, alteração e exclusão (CRUD) de dados. Construída com framework Flask em Python e integração com banco de dados PostgreSQL relacional.',
      tags: ['Python', 'Flask', 'PostgreSQL', 'SQL', 'Bootstrap / CSS', 'APIs'],
      codeSnippet: `# Backend Flask com SQLAlchemy & PostgreSQL
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/db_crud'
db = SQLAlchemy(app)

@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = Item(nome=data['nome'], descricao=data['descricao'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"status": "sucesso"}), 201`
    },
    'proj-4': {
      title: 'Portfólio Pessoal com CSS Modular',
      category: 'Frontend & UI Engineering',
      desc: 'Website profissional de apresentação pessoal construído com arquitetura de CSS separada em 5 módulos (variáveis, base, componentes, seções e animações). Suporta modo claro e escuro em degradê com memória de tema.',
      tags: ['HTML5 Semântico', 'CSS3 Modular', 'JavaScript ES6+', 'UX/UI', 'Responsive'],
      codeSnippet: `/* Arquitetura de CSS Modular de Rafael Fernandes */
@import url('./variables.css');
@import url('./base.css');
@import url('./components.css');
@import url('./sections.css');
@import url('./animations.css');`
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-proj-id');
      const data = projectsData[projId];

      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDesc.textContent = data.desc;
        modalCode.textContent = data.codeSnippet;

        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = tag;
          modalTags.appendChild(span);
        });

        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. SCROLL REVEAL & ANIMAÇÃO DE BARRAS DE HABILIDADE
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-progress');

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('active');
      }
    });

    skillBars.forEach(bar => {
      const top = bar.getBoundingClientRect().top;
      if (top < triggerBottom) {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth;
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();

 /* --------------------------------------------------------------------------
     7. FORMULÁRIO DE CONTATO VIA WEB3FORMS (ENVIO REAL)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btnSubmit = contactForm.querySelector('button[type="submit"]');
      const originalText = btnSubmit.innerHTML;

      btnSubmit.innerHTML = `** Enviando...`;
      btnSubmit.disabled = true;

      const formData = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          btnSubmit.innerHTML = `** Mensagem Enviada!`;
          btnSubmit.style.background = '#10b981';

          showToast('Obrigado pelo contato! Mensagem enviada para Rafael.');

          contactForm.reset();
        } else {
          showToast('Ocorreu um erro ao enviar. Tente novamente.');
        }
      })
      .catch(() => {
        showToast('Erro de conexão ao enviar a mensagem.');
      })
      .finally(() => {
        setTimeout(() => {
          btnSubmit.innerHTML = originalText;
          btnSubmit.style.background = '';
          btnSubmit.disabled = false;
        }, 3000);
      });
    });
  }
