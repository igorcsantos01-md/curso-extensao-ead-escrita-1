import React from 'react';
import { RotateCcw, FileDown, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { CERTIFICATE_01_DATA, CertificateRecord } from '../data/certificateData';

interface CertificateEditorPanelProps {
  data: CertificateRecord;
  onChange: (updated: CertificateRecord) => void;
  onReset: () => void;
  onDownloadPdf: () => void;
  isGeneratingPdf: boolean;
}

export const CertificateEditorPanel: React.FC<CertificateEditorPanelProps> = ({
  data,
  onChange,
  onReset,
  onDownloadPdf,
  isGeneratingPdf,
}) => {
  const handleFieldChange = (field: keyof CertificateRecord, value: string | number) => {
    const next = { ...data, [field]: value };
    if (
      field === 'holderQualification' ||
      field === 'holderCpf' ||
      field === 'holderInstitution'
    ) {
      next.holderLine = `${next.holderQualification} | CPF: ${next.holderCpf} | ${next.holderInstitution}`;
    }
    onChange(next);
  };

  const handleAxisChange = (
    index: number,
    field: 'title' | 'subtitle' | 'description' | 'hours',
    value: string
  ) => {
    const nextAxes = data.axes.map((ax, i) => (i === index ? { ...ax, [field]: value } : ax));
    onChange({ ...data, axes: nextAxes });
  };

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-6 text-slate-900 shadow-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Modo de Edição Direta de Todos os Campos (Sincronizado com o PDF Vetorial)
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif-cert mt-0.5">
            Personalizar / Editar Informações do Certificado Nº {data.certNumber}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Qualquer alteração abaixo atualiza em tempo real as 2 Laudas na tela e o arquivo <strong>.PDF</strong> vetorial para download.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Padrão Oficial
          </button>
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-amber-300" />
            {isGeneratingPdf ? 'Gerando PDF...' : 'Baixar PDF Editado (.pdf)'}
          </button>
        </div>
      </div>

      {/* Grupo 1: Dados do Titular */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
          1. Identificação do Profissional Titular
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Nome Completo do Titular</label>
            <input
              type="text"
              value={data.holderName}
              onChange={(e) => handleFieldChange('holderName', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">CPF Registrado</label>
            <input
              type="text"
              value={data.holderCpf}
              onChange={(e) => handleFieldChange('holderCpf', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Qualificação Profissional</label>
            <input
              type="text"
              value={data.holderQualification}
              onChange={(e) => handleFieldChange('holderQualification', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Instituição de Origem (IES)</label>
            <input
              type="text"
              value={data.holderInstitution}
              onChange={(e) => handleFieldChange('holderInstitution', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>
      </div>

      {/* Grupo 2: Curso, Período, Carga Horária e Datas */}
      <div className="space-y-3 pt-3 border-t border-slate-200">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
          2. Dados do Curso, Período, Carga Horária e Aprovação
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs">
          <div className="lg:col-span-8">
            <label className="block font-semibold text-slate-600 mb-1">Título Oficial da Atividade Extracurricular</label>
            <input
              type="text"
              value={data.courseTitle}
              onChange={(e) => handleFieldChange('courseTitle', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div className="lg:col-span-4">
            <label className="block font-semibold text-slate-600 mb-1">Modalidade Curricular</label>
            <input
              type="text"
              value={data.modality}
              onChange={(e) => handleFieldChange('modality', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>

          <div className="lg:col-span-4">
            <label className="block font-semibold text-slate-600 mb-1">Período de Realização</label>
            <input
              type="text"
              value={data.period}
              onChange={(e) => handleFieldChange('period', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block font-semibold text-slate-600 mb-1">Carga Horária por Extenso</label>
            <input
              type="text"
              value={data.totalHoursText}
              onChange={(e) => handleFieldChange('totalHoursText', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block font-semibold text-slate-600 mb-1">Nota Final</label>
            <input
              type="text"
              value={data.finalGrade}
              onChange={(e) => handleFieldChange('finalGrade', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block font-semibold text-slate-600 mb-1">Local e Data de Emissão</label>
            <input
              type="text"
              value={data.issueDate}
              onChange={(e) => handleFieldChange('issueDate', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>
      </div>

      {/* Grupo 3: Códigos de Autenticidade, Livro, Folha e Hash */}
      <div className="space-y-3 pt-3 border-t border-slate-200">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
          3. Rastreabilidade, Livro, Código, Chave de Controle e Hash SHA-256
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Certificado Nº</label>
            <input
              type="text"
              value={data.certNumber}
              onChange={(e) => handleFieldChange('certNumber', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Livro nº</label>
            <input
              type="text"
              value={data.bookNumber}
              onChange={(e) => handleFieldChange('bookNumber', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Folha nº</label>
            <input
              type="text"
              value={data.pageNumber}
              onChange={(e) => handleFieldChange('pageNumber', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Código de Autenticidade</label>
            <input
              type="text"
              value={data.code}
              onChange={(e) => handleFieldChange('code', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-emerald-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Chave de Controle</label>
            <input
              type="text"
              value={data.controlKey}
              onChange={(e) => handleFieldChange('controlKey', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-amber-900"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">URL Oficial p/ QR Code e Verificação</label>
            <input
              type="text"
              value={data.verificationUrl}
              onChange={(e) => handleFieldChange('verificationUrl', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Hash Criptográfico SHA-256</label>
            <input
              type="text"
              value={data.sha256}
              onChange={(e) => handleFieldChange('sha256', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Grupo 4: Matriz de 4 Eixos do Verso */}
      <div className="space-y-3 pt-3 border-t border-slate-200">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
          4. Eixos Programáticos do Verso Oficial (Lauda 2)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {data.axes.map((ax, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={ax.title}
                  onChange={(e) => handleAxisChange(idx, 'title', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-bold text-slate-900"
                />
                <input
                  type="text"
                  value={ax.hours}
                  onChange={(e) => handleAxisChange(idx, 'hours', e.target.value)}
                  className="w-24 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-emerald-800 text-right"
                />
              </div>
              <input
                type="text"
                value={ax.subtitle}
                onChange={(e) => handleAxisChange(idx, 'subtitle', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-600"
              />
              <textarea
                rows={2}
                value={ax.description}
                onChange={(e) => handleAxisChange(idx, 'description', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 leading-snug"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
