# Página Web Pet Walkers 🐾
<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" width="100" height="35"></a>
  <a href="#"><img src="https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white" alt="HTML" width="100" height="35"></a>
  <a href="#"><img src="https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff" alt="CSS" width="90" height="35"></a>
  <a href="#"><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" width="100" height="35"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" width="100" height="35"></a>
  <a href="#"><img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" width="100" height="35"></a>
  <a href="#"><img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="Visual Studio Code" width="125" height="35"></a>
</p>


## Descrição 📜
O **Pet Walkers** é um projeto desenvolvido como parte do Projeto Integrador. O objetivo é criar uma plataforma digital que conecta tutores de pets a cuidadores qualificados para passeios e exercícios físicos. O projeto visa proporcionar uma experiência segura, divertida e enriquecedora para os pets, enquanto oferece praticidade e tranquilidade aos tutores ocupados.

## Visão Geral 🌟
A plataforma oferece uma série de funcionalidades que incluem o cadastro de usuários, pesquisa e seleção de cuidadores, agendamento de passeios, avaliações e um sistema de pagamento.

## Capturas de Tela e Demonstração 📸
Aqui estão algumas capturas de tela que ilustram as principais telas da plataforma:

### Tela de Login
![Login](https://github.com/user-attachments/assets/0d484fc6-cd22-4830-b69d-ed74f024af94)

### Tela de Cadastro de Walker
![Walker](https://github.com/user-attachments/assets/65ecf63d-c039-4570-88ce-875c3d40cb24)

### Tela de Home
![Home](https://github.com/user-attachments/assets/2b8a2f56-20f0-41fb-aabb-fce8a7630aef)

### Tela de Carrinho
![Carrinho](https://github.com/user-attachments/assets/82a69e86-00af-458b-aa37-4e4ff600fc9a)

### Tela de Logout
![Tela - Logout](https://github.com/user-attachments/assets/fe6f3472-26e2-4ace-9f97-3dd536792aeb)

## Instalação e Execução ⚙️1. Instalar o Docker
   - Primeiro, instale o [**Docker**](https://www.docker.com/) na sua máquina, incluindo o Docker Compose.
     ![Docker](https://github.com/user-attachments/assets/37ded6bd-e1fa-4c33-9721-d3f8614aa54d)
     
2. Clonar o repositorio do projeto
    - Abra o terminal e execute o comando para clonar o repositório do projeto:
      ```bash
    git clone [https://github.com/usuario/repo.git](https://github.com/nicolyjjang/Pet-Walkers-2.0.git)
    ```
  ![Clone](https://github.com/user-attachments/assets/a0f2e913-0226-4f5a-9902-09fba5d484ae)
     
3. Abrir o terminal do sistema operacional
     
4. No terminal, navegue até a pasta raiz do projeto
   ```bash
    cd .\PetWalkers-2.0\
    ```
     ![Raiz](https://github.com/user-attachments/assets/a2a960ee-f1c3-4ab9-ba26-420d8ba0a480)
   
6. Com o docker já em execução no sistema operacional, execute o comando:
   ```bash
    docker-compose up -d --build
    ```
     ![docker_noar](https://github.com/user-attachments/assets/233b622c-052b-4ab5-bf40-c406f7caf855)
     ![ambiente](https://github.com/user-attachments/assets/8b1a4527-9245-4c90-8c88-25e834db4ec3)
   
8. Navegar para a página inicial, no browser (navegador):
   - Acesse http://localhost
     ![Navegação](https://github.com/user-attachments/assets/4a086076-fcc3-4411-bde1-ececd7f2474c)
   
### Considerações Finais - Troubleshooting

  **O ambiente pode apresentar algumas situações não controladas que podem precisar de algum tipo de intervenção manual.**
     1. **Problema:** A criação do banco MySQL pode não ser detectada imediatamente pelo Docker Compose, resultando na criação do container do backend antes que o banco esteja pronto.
     - **Solução:** Reinicie o container do backend após o banco ter sido construído completamente:
     ```bash
     docker-compose up backend
     ```
2. **Problema:** A API de mock de pagamentos pode expirar devido a políticas administrativas do serviço designer.mocky.io.
   - **Solução:** Se o botão de "Pagar" apresentar um erro 500 no navegador (que remete a um erro 404 na log do container backend), você pode criar uma nova API no site designer.mocky.io, atualizar o parâmetro `MOCKY_URL` no arquivo `.env` e reiniciar o container do backend:
     ```bash
     docker-compose up backend
     ```
        ![mocky](https://github.com/user-attachments/assets/51091280-4e3b-4c21-ba44-56a159d27e1c)
        ![env](https://github.com/user-attachments/assets/7e226962-6539-4d0a-9e06-83638266f84d)


## Requisitos de sistema 🖥️
* Sistema desktop
* Docker instalado e executando (ambiente de desenvolvimento)
* Git  (ambiente de desenvolvimento)

## Funcionalidades Principais 🛠️
* Cadastro de Usuário: Tutores e cuidadores podem se cadastrar na plataforma preenchendo um formulário com informações básicas.
* Pesquisa e Seleção: Tutores podem pesquisar e selecionar cuidadores com base em critérios como localização, disponibilidade e avaliações de outros usuários.
* Agendamento de Passeios: Tutores podem agendar passeios e exercícios físicos para seus pets com os cuidadores selecionados.
* Avaliações e Feedback: Após cada passeio, os tutores podem avaliar a experiência e fornecer feedback sobre o cuidador.
* Carrinho: Tutores podem efetuar pagamentos pelos serviços contratados utilizando um sistema de pagamento, aceitando apenas cartões de crédito.
* Atualização de Dados: Clientes e walkers podem atualizar suas informações pessoais e de disponibilidade.

## Mais informações 🔗
### Link do Prototipo
* Para melhor abstração e visualização dos Protótipos que foram desenvolvidos no FIGMA:

[**Clique aqui para acessar (requer cadastro no FIGMA)**](https://www.figma.com/design/aXU1wVdHDUHJc27WbSaT5K/Pet-Walkers---2.0?node-id=0-1&t=B3XhY5MfhmysK1Fh-1)


## Arquitetura do Sistema 💻
O sistema é composto pelos seguintes componentes:
- **Frontend**: Desenvolvido com HTML, CSS e JavaScript.
- **Backend**: Express JS
- **Banco de Dados**: MySql

## Colaboradores 🫱🏽‍🫲🏼

<table align="center">
  <td align="center">
      <img src="https://avatars.githubusercontent.com/u/145237759?v=4" alt="Antenor Pereira dos Santos" style="width: 100px; height: 100px; border-radius: 50%;" />
      <br />
      Antenor Pereira dos Santos
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/145172974?v=4" alt="Lívia Yuri Tanaka Castilho" style="width: 100px; height: 100px; border-radius: 50%;" />
      <br />
      Lívia Yuri Tanaka Castilho
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/123497104?v=4" alt="Marina Augusto de Moraes" style="width: 100px; height: 100px; border-radius: 50%;" />
      <br />
      Marina Augusto de Moraes
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/107158277?s=400&u=05ecc01dd6fc7115310d2d5a8d61c79f082f4ab7&v=4" alt="Nicoly de Jesus Jang" style="width: 100px; height: 100px; border-radius: 50%;" />
      <br />
      Nicoly de Jesus Jang
    </td>
</table>
