export enum EResource {
        CNAES = 'Cnaes',
        EMPRESAS = 'Empresas',
        ESTABELECIMENTOS = 'Estabelecimentos',
        MOTIVOS = 'Motivos',
        MUNICIPIOS = 'Municipios',
        NATUREZAS = 'Naturezas',
        PAISES = 'Paises',
        QUALIFICACOES = 'Qualificacoes',
        SIMPLES = 'Simples',
        SOCIOS = 'Socio'
}

export enum EProcessState {
        INITIAL,
        SELECTING_URL,
        DOWNLOADING,
        SAVING_TO_DATABASE,
        COMPLETED,
      }