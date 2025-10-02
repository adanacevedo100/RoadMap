
import React, { useState, useMemo, useCallback } from 'react';
import RoadmapChart from './components/RoadmapChart';
import EditPanel from './components/EditPanel';
import DetailModal from './components/DetailModal';
import AddNodeModal from './components/AddNodeModal';
import AuthModal from './components/AuthModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import SprintHistoryModal from './components/SprintHistoryModal';
import ProgressBar from './components/ProgressBar';
import { rootData } from './constants';
import type { RoadmapNodeData } from './types';
import { getCurrentSprintId, groupCompletedBySprint } from './utils/sprintUtils';

// --- Utility Functions for Immutable Tree Manipulation ---

const processInitialData = (node: RoadmapNodeData, prefix = 'node'): RoadmapNodeData => {
  const id = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  return {
    ...node,
    id,
    progress: node.progress ?? { isCompleted: false },
    children: node.children?.map((child, index) => processInitialData(child, `${id}-${index}`)),
  };
};

const updateNodeInTree = (
  nodes: RoadmapNodeData[],
  targetId: string,
  updater: (node: RoadmapNodeData) => RoadmapNodeData
): RoadmapNodeData[] => {
  return nodes.map(node => {
    if (node.id === targetId) {
      return updater(node);
    }
    if (node.children) {
      return { ...node, children: updateNodeInTree(node.children, targetId, updater) };
    }
    return node;
  });
};

const removeNodeFromTree = (nodes: RoadmapNodeData[], targetId: string): RoadmapNodeData[] => {
  return nodes.filter(node => node.id !== targetId).map(node => {
    if (node.children) {
      return { ...node, children: removeNodeFromTree(node.children, targetId) };
    }
    return node;
  });
};

const findNodeById = (nodes: RoadmapNodeData[], targetId: string): RoadmapNodeData | null => {
  for (const node of nodes) {
    if (node.id === targetId) return node;
    if (node.children) {
      const found = findNodeById(node.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

const findParentId = (root: RoadmapNodeData, childId: string): string | null => {
    if (!root.children) return null;
    for (const child of root.children) {
        if (child.id === childId) return root.id!;
        if (child.children) {
            const parentId = findParentId(child, childId);
            if (parentId) return parentId;
        }
    }
    return null;
}

const flattenTree = (node: RoadmapNodeData): { id: string, name: string, level: number }[] => {
  const list: { id: string, name: string, level: number }[] = [];
  const traverse = (currentNode: RoadmapNodeData, level: number) => {
    if (currentNode.id) {
        list.push({ id: currentNode.id, name: currentNode.name, level });
    }
    currentNode.children?.forEach(child => traverse(child, level + 1));
  };
  traverse(node, 0);
  return list;
};

const calculateProgress = (node: RoadmapNodeData): { completed: number, total: number } => {
    if (!node.children || node.children.length === 0) {
        const completed = node.progress?.isCompleted ? 1 : 0;
        return { completed, total: 1 };
    }

    const totals = node.children.reduce((acc, child) => {
        const childProgress = calculateProgress(child);
        acc.completed += childProgress.completed;
        acc.total += childProgress.total;
        return acc;
    }, { completed: 0, total: 0 });

    return totals;
}

const App: React.FC = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapNodeData>(() => processInitialData(rootData));
  const [selectedNode, setSelectedNode] = useState<RoadmapNodeData | null>(null);
  const [isTrackingMode, setIsTrackingMode] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSprintHistory, setShowSprintHistory] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<RoadmapNodeData | null>(null);

  const flatData = useMemo(() => flattenTree(roadmapData), [roadmapData]);
  const progressData = useMemo(() => {
      const progressMap = new Map<string, { completed: number, total: number }>();
      const traverse = (node: RoadmapNodeData) => {
          if (node.id) {
              progressMap.set(node.id, calculateProgress(node));
          }
          node.children?.forEach(traverse);
      };
      traverse(roadmapData);
      return progressMap;
  }, [roadmapData]);

  const globalProgress = progressData.get(roadmapData.id!) ?? { completed: 0, total: 0 };

  const handleNodeClick = useCallback((nodeData: RoadmapNodeData) => {
    setSelectedNode(nodeData);
  }, []);

  const handleClosePanels = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleEnterTrackingMode = () => {
    setShowAuthModal(true);
  };

  const handleExitTrackingMode = () => {
    setIsTrackingMode(false);
    handleClosePanels();
  };

  const handleLogin = (pass: string) => {
    if (pass === 'TRACK2025') {
      setIsTrackingMode(true);
      setShowAuthModal(false);
      handleClosePanels();
      return true;
    }
    return false;
  };

  const handleSaveNode = useCallback((updatedData: RoadmapNodeData, newParentId?: string) => {
    if (!selectedNode?.id) return;
  
    setRoadmapData(currentData => {
      let newTree = JSON.parse(JSON.stringify(currentData));
      
      const isMoving = newParentId && newParentId !== findParentId(newTree, selectedNode.id);

      // Simple update in place if not moving
      if (!isMoving) {
        const updater = (node: RoadmapNodeData) => ({
          ...node,
          name: updatedData.name,
          details: updatedData.details,
          category: updatedData.category,
          imageUrl: updatedData.imageUrl,
          customColor: updatedData.customColor,
        });

        if (selectedNode.id === newTree.id) {
            return updater(newTree);
        }
        
        newTree.children = updateNodeInTree(newTree.children || [], selectedNode.id!, updater);
        return newTree;
      }
      
      // Complex logic for moving node
      let nodeToMove: RoadmapNodeData | null = null;
      
      const findAndRemove = (nodes: RoadmapNodeData[]): RoadmapNodeData[] => {
          return nodes.filter(node => {
              if(node.id === selectedNode.id) {
                  nodeToMove = node;
                  return false;
              }
              if(node.children) {
                  node.children = findAndRemove(node.children);
              }
              return true;
          });
      };
      
      if (newTree.children) {
        newTree.children = findAndRemove(newTree.children);
      }

      if(nodeToMove) {
        const updatedNodeToMove = { 
            ...nodeToMove, 
            name: updatedData.name,
            details: updatedData.details,
            category: updatedData.category,
            imageUrl: updatedData.imageUrl,
            customColor: updatedData.customColor,
        };

        const findAndAdd = (nodes: RoadmapNodeData[]): RoadmapNodeData[] => {
            return nodes.map(node => {
                if (node.id === newParentId) {
                    return { ...node, children: [...(node.children || []), updatedNodeToMove] };
                }
                if (node.children) {
                    return { ...node, children: findAndAdd(node.children) };
                }
                return node;
            });
        };
        if (newTree.id === newParentId) {
             newTree.children = [...(newTree.children || []), updatedNodeToMove];
        } else if (newTree.children) {
            newTree.children = findAndAdd(newTree.children);
        }
      }

      return newTree;
    });
  
    handleClosePanels();
  }, [selectedNode, handleClosePanels]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    const node = findNodeById([roadmapData], nodeId);
    setNodeToDelete(node);
  }, [roadmapData]);

  const handleConfirmDelete = useCallback(() => {
    if (nodeToDelete?.id) {
      setRoadmapData(currentData => {
          const newChildren = removeNodeFromTree(currentData.children || [], nodeToDelete.id!);
          return { ...currentData, children: newChildren };
      });
      setNodeToDelete(null);
      handleClosePanels();
    }
  }, [nodeToDelete, handleClosePanels]);

  const handleAddNode = useCallback((newNodeData: Omit<RoadmapNodeData, 'id'>, parentId: string) => {
    const newNode = processInitialData(newNodeData as RoadmapNodeData);
    setRoadmapData(currentData => {
        let newTree = JSON.parse(JSON.stringify(currentData));
        if (parentId === newTree.id) {
            newTree.children = [...(newTree.children || []), newNode];
        } else {
            const add = (nodes: RoadmapNodeData[]) => nodes.map(n => {
                if (n.id === parentId) {
                    return { ...n, children: [...(n.children || []), newNode] };
                }
                if (n.children) {
                    return { ...n, children: add(n.children) };
                }
                return n;
            });
            newTree.children = add(newTree.children || []);
        }
        return newTree;
    });
    setShowAddNodeModal(false);
  }, []);

  const handleMarkAsCompleted = useCallback((nodeId: string, isCompleted: boolean) => {
    const updater = (node: RoadmapNodeData): RoadmapNodeData => ({
        ...node,
        progress: {
            ...node.progress,
            isCompleted,
            completionDate: isCompleted ? new Date().toISOString() : undefined,
            sprintId: isCompleted ? (node.progress?.sprintId || getCurrentSprintId()) : undefined,
        }
    });
    
    setRoadmapData(currentData => {
        if(currentData.id === nodeId) {
            return updater(currentData);
        }
        return {
            ...currentData,
            children: updateNodeInTree(currentData.children || [], nodeId, updater),
        }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-white shadow-md sticky top-0 z-30">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Roadmap Interactivo TurboSteps</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isTrackingMode && (
                            <>
                                <button onClick={() => setShowAddNodeModal(true)} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                                    ✨ Añadir Tarjeta
                                </button>
                                <button onClick={() => setShowSprintHistory(true)} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                                    🗓️ Historial de Entregas
                                </button>
                            </>
                        )}
                        {!isTrackingMode ? (
                            <button onClick={handleEnterTrackingMode} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                🔒 Modo Seguimiento
                            </button>
                        ) : (
                            <button onClick={handleExitTrackingMode} className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">
                                Ver Modo Público
                            </button>
                        )}
                    </div>
                </div>
                 {isTrackingMode && (
                    <div className="px-4 sm:px-6 lg:px-8 pb-4">
                        <ProgressBar completed={globalProgress.completed} total={globalProgress.total} />
                    </div>
                )}
            </div>
        </header>

        <main className="w-full">
            <RoadmapChart data={roadmapData} progressData={progressData} onNodeClick={handleNodeClick} isTrackingMode={isTrackingMode} />
        </main>

        <section id="download" className="w-full py-10 bg-white border-t">
            <div className="text-center max-w-3xl mx-auto px-4">
                <p className="text-gray-600">En el árbol jerárquico, solo está de manera práctica y reducida la visión del Roadmap. Para más detalles del roadmap de desarrollo del ecosistema TurboSteps, puedes descargar el documento donde están todos los detalles del Roadmap.</p>
                <div className="mt-6">
                    <span className="text-3xl" role="img" aria-label="hand pointing down">👇</span>
                </div>
                <a 
                  href="https://docs.google.com/document/d/1zkSqtAsl1Nh6-8qpaTXo5eJ68LdO8UKy9ebF9HasQDU/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Descargar Roadmap
                </a>
            </div>
        </section>


        {isTrackingMode && selectedNode && (
            <EditPanel 
                nodeData={selectedNode}
                allNodes={flatData}
                currentParentId={findParentId(roadmapData, selectedNode.id!)}
                onClose={handleClosePanels}
                onSave={handleSaveNode}
                onDelete={handleDeleteNode}
                onMarkAsCompleted={handleMarkAsCompleted}
            />
        )}
        {!isTrackingMode && selectedNode && (
            <DetailModal nodeData={selectedNode} onClose={handleClosePanels} />
        )}
        {showAddNodeModal && (
            <AddNodeModal nodes={flatData} onClose={() => setShowAddNodeModal(false)} onSave={handleAddNode} />
        )}
        {showAuthModal && (
            <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
        )}
        {nodeToDelete && (
            <ConfirmDeleteModal 
                isOpen={!!nodeToDelete} 
                nodeName={nodeToDelete.name}
                onConfirm={handleConfirmDelete}
                onCancel={() => setNodeToDelete(null)}
            />
        )}
        {showSprintHistory && (
            <SprintHistoryModal
                isOpen={showSprintHistory}
                onClose={() => setShowSprintHistory(false)}
                data={groupCompletedBySprint(roadmapData)}
            />
        )}
    </div>
  );
};

export default App;
