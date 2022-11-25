export const useWineEngineApiClient = () => {
  const list = async () => {
    return [
      {
        id: 1,
        version: 'WS11WineCX64Bit22.0.1',
        url: 'https://mega.nz/file/VF4mSCpQ#UDC10env2AKKAEqqfv2Gbz8sk26mkwn1VNcAOL_nIi4',
      },
    ];
  };

  return { list };
};
