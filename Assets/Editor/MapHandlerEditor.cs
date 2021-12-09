using UnityEngine;
using UnityEditor;
using UnityEditor.UIElements;
using DarkDescent.World;

namespace DarkDescent
{
	[CustomEditor(typeof(MapHandler), true)]
	public class MapHandlerEditor : Editor
	{
		public override void OnInspectorGUI()
		{
			DrawDefaultInspector();
			if (GUILayout.Button("Export"))
			{
				MapHandler mapHandler = target as MapHandler;
				mapHandler.Export();
			}
			if (GUILayout.Button("Build Map Boundaries"))
			{
				MapHandler mapHandler = target as MapHandler;
				mapHandler.BuildBoundaries();
			}
		}
	}
}
