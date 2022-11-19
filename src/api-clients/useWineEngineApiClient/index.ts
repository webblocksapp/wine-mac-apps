export const useWineEngineApiClient = () => {
  const list = async () => {
    return [{ name: 'WS11WineCX64Bit22.0.1' }];
  };

  return { list };
};
