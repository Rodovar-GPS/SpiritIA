
import React, { useState } from 'react';

interface RegistrationFormProps {
  onComplete: (data: any) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    phone: '',
    email: '',
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Protocolo de segurança Spirit IA BR
    console.log("SPIRIT IA BR: PROTOCOLO DE REGISTRO INICIADO");
    console.log("NOTIFICANDO ADMINISTRADOR: jairo_bahia@msn.com");
    onComplete(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto glass p-12 rounded-[3rem] border-emerald-500/30 shadow-[0_0_100px_rgba(16,185,129,0.1)]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mono text-emerald-400 uppercase tracking-tighter italic">REGISTRO</h2>
        <p className="text-[10px] text-slate-500 mono mt-2 uppercase tracking-[0.4em]">Acesso de Nível Investigativo Profissional</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Nome Completo" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Idade" name="age" type="number" value={formData.age} onChange={handleChange} required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="País" name="country" value={formData.country} onChange={handleChange} required />
          <Input label="Telefone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" required />
        </div>

        <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} required />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-emerald-500/10">
          <Input label="Usuário" name="username" value={formData.username} onChange={handleChange} required />
          <Input label="Senha" name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-500 text-black py-6 rounded-2xl font-black mono uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] mt-8 text-lg"
        >
          CONFIRMAR DADOS
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] text-emerald-500 mono uppercase font-bold ml-2">{label}</label>
    <input 
      {...props} 
      className="bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-2xl text-sm text-emerald-100 mono focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-800"
    />
  </div>
);

export default RegistrationForm;
