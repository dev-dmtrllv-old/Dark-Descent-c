using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace DarkDescent.World
{
	public class MapHandler : MonoBehaviour
	{

#if UNITY_EDITOR

		[SerializeField] public string exportPath = "Exports/maps";
		[SerializeField] public string platformLayerName = "Platform";
		[SerializeField] private bool showBoundaries = true;

		private MapExportData CreateExportData()
		{
			MapExportData data = new MapExportData();
			data.size = size;
			return data;
		}

		public void Export()
		{
			string dir = Path.Combine(Application.dataPath, exportPath);

			try
			{
				if (!Directory.Exists(dir))
					Directory.CreateDirectory(dir);

				MapExportData data = CreateExportData();

				string jsonPath = Path.Combine(dir, SceneManager.GetActiveScene().name + ".json");

				StreamWriter writer = new StreamWriter(jsonPath, true);
				writer.WriteLine(JsonUtility.ToJson(data));
				writer.Close();
			}
			catch (IOException ex)
			{
				Debug.Log(ex.Message);
			}
		}

		public void BuildBoundaries()
		{
			List<BoxCollider2D> colliders = new List<BoxCollider2D>();
			GetComponents<BoxCollider2D>(colliders);

			for (int i = 0; i < 4; i++)
				if (i >= colliders.Count)
					colliders.Add(gameObject.AddComponent<BoxCollider2D>());

			colliders[0].offset = new Vector2((size.x / 2) + (boundaryThickness / 2) + offset.x, offset.y);
			colliders[0].size = new Vector2(boundaryThickness, size.y);

			colliders[1].offset = new Vector2((size.x / -2) - (boundaryThickness / 2) + offset.x, offset.y);
			colliders[1].size = new Vector2(boundaryThickness, size.y);

			colliders[2].offset = new Vector2(0 + offset.x, (size.y / 2) + (boundaryThickness / 2) + offset.y);
			colliders[2].size = new Vector2(size.x, boundaryThickness);

			colliders[3].offset = new Vector2(0 + offset.x, (size.y / -2) - (boundaryThickness / 2) + offset.y);
			colliders[3].size = new Vector2(size.x, boundaryThickness);
		}


		[DrawGizmo(GizmoType.Selected | GizmoType.NonSelected | GizmoType.NotInSelectionHierarchy | GizmoType.Active)]
		void OnDrawGizmos()
		{
			if (showBoundaries)
			{
				var a = new Vector2((size.x / 2) + offset.x, (size.y / 2) + offset.y);
				var b = new Vector2((size.x / 2) + offset.x, (size.y / -2) + offset.y);
				var c = new Vector2((size.x / -2) + offset.x, (size.y / -2) + offset.y);
				var d = new Vector2((size.x / -2) + offset.x, (size.y / 2) + offset.y);

				Gizmos.DrawLine(a, b);
				Gizmos.DrawLine(b, c);
				Gizmos.DrawLine(c, d);
				Gizmos.DrawLine(d, a);
			}
		}

#endif


		[SerializeField] private Vector2 size;
		[SerializeField] private Vector2 offset = Vector2.zero;
		[SerializeField] private float boundaryThickness = 0.5f;

		protected void Update()
		{

		}

	}
}
