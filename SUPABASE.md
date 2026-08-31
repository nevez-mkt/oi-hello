# Integração planejada com Supabase

Esta primeira entrega deixa as telas prontas, mas não conecta nenhum ambiente real. Não adicione chaves, URL do projeto ou `service_role` ao código do navegador.

## Quando configurar o ambiente

1. Crie o projeto Supabase e execute `supabase/migrations/20260831_digitalos_schema.sql` pelo SQL Editor ou pelo CLI do Supabase.
2. Configure apenas a URL pública e a chave anônima no ambiente de deploy (por exemplo, `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`). Elas não são incluídas neste repositório.
3. Instale e configure o cliente `@supabase/supabase-js`; o fluxo de entrada/criação de conta deve usar e-mail e senha. Provedores sociais só devem ser exibidos depois de configurados no painel Supabase.
4. Crie uma função/trigger segura para criar `profiles` quando `auth.users` receber um usuário novo.
5. O gateway deve avisar uma função de servidor por webhook validado. Essa função atualiza `subscriptions`, registra `sales` e libera o acesso. Não permita que o navegador crie ou altere assinaturas.
6. A chamada de IA deve ocorrer em função de servidor. Ela deve verificar uma assinatura ativa e o limite do mês antes de gravar `guides` e `generation_usage`.

## Privacidade e RLS

As tabelas de perfil, assinatura, guias e uso já nascem com RLS habilitado na migração. As políticas permitem ao usuário acessar apenas seus registros. Escritas privilegiadas de cobrança, contagem e afiliados ficam restritas à camada de servidor.

Antes de liberar, revise as políticas e teste pelo menos duas contas diferentes para confirmar que uma não consegue ler dados da outra.
