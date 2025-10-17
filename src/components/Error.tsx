function Error({ error }: { error: string }) {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 w-full">
      <p className="text-white text-sm font-medium text-center">{error}</p>
    </div>
  );
}

export default Error;
