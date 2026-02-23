function App() {

  const [showWelcome, setShowWelcome] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { currentProject, createProject } = useProjectStore();
  const { loadTemplates, loadStyles } = useTemplateStore();
  const { loadPlans, initialize } = useUserStore();

  // 🔥 TESTE
  // useEffect(() => {
  //   loadTemplates();
  //   loadStyles();
  //   loadPlans();
  //   initialize();
  // }, []);

  useEffect(() => {
    if (currentProject) {
      setShowWelcome(false);
    }
  }, [currentProject]);
